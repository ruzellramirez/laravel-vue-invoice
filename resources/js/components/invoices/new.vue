<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let form = ref([]);
let allcustomers = ref([]);
let customer_id = ref([]);
let item = ref([]);
let listCart = ref([]);
const showModal = ref(false);
let listproducts = ref([]);

onMounted(async () => {
  indexForm();
  getAllCustomers();
  getProducts();
});

// gets a blank invoice then saves to form state
const indexForm = async () => {
  let response = await axios.get("/api/create_invoice");
  form.value = response.data;
};

// gets all customers to choose from in card header then saves to allcustomers state
const getAllCustomers = async () => {
  let response = await axios.get("/api/customers");
  allcustomers.value = response.data.customers;
};

// adds item to cart then pushes to listCart state array
const addCart = (item) => {
  const itemcart = {
    id: item.id,
    item_code: item.item_code,
    description: item.description,
    unit_price: item.unit_price,
    quantity: 1,
  };
  listCart.value.push(itemcart);
  toggleModal();
};

// gets all exisiting products to choose from then saves to listproducts state
const getProducts = async () => {
  let response = await axios.get("/api/products");
  listproducts.value = response.data.products;
};

const removeItem = (i) => {
  listCart.value.splice(i, 1);
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const subTotal = () => {
  let total = 0;
  listCart.value.map((data) => {
    total = total + data.quantity * data.unit_price;
  });
  return total;
};

const total = () => {
  return subTotal() - form.value.discount;
};

const onSave = () => {
  // check if there's at least 1 product on cart
  if (listCart.value.length >= 1) {
    let subtotal_price = 0;
    subtotal_price = subTotal();
    let total_price = 0;
    total_price = total();

    const formData = new FormData();
    formData.append("invoice_item", JSON.stringify(listCart.value));
    formData.append("customer_id", customer_id.value);
    formData.append("date", form.value.date);
    formData.append("due_date", form.value.due_date);
    formData.append("number", form.value.number);
    formData.append("reference", form.value.reference);
    formData.append("discount", form.value.discount);
    formData.append("subtotal", subtotal_price);
    formData.append("total", total_price);
    formData.append("terms_and_conditions", form.value.terms_and_conditions);

    axios.post("/api/add_invoice", formData);
    listCart.value = [];
    form.value.discount = 0;
    router.push("/");
  }
};
</script>

<template>
  <div class="container">
    <div class="invoices">
      <div class="card__header">
        <div>
          <h2 class="invoice__title">New Invoice</h2>
        </div>
        <div></div>
      </div>

      <div class="card__content">
        <div class="card__content--header">
          <!-- contains customer name, date, due date, number, and reference -->
          <div>
            <p class="my-1">Customer</p>
            <!-- gets customer.id from selected customer then saves to customer_id state -->
            <select name="" id="" class="input" v-model="customer_id">
              <option disabled>Select a customer</option>
              <option
                v-for="customer in allcustomers"
                :value="customer.id"
                :key="customer.id"
              >
                {{ customer.firstname }}
              </option>
            </select>
          </div>
          <div>
            <p class="my-1">Date</p>
            <input
              id="date"
              placeholder="dd-mm-yyyy"
              type="date"
              class="input"
              v-model="form.date"
            />
            <p class="my-1">Due Date</p>
            <input
              id="due_date"
              type="date"
              class="input"
              v-model="form.due_date"
            />
          </div>
          <div>
            <p class="my-1">Number</p>
            <input type="text" class="input" v-model="form.number" />
            <p class="my-1">Reference(Optional)</p>
            <input type="text" class="input" v-model="form.reference" />
          </div>
        </div>
        <br /><br />

        <div class="table">
          <div class="table--heading2">
            <p>Item Description</p>
            <p>Unit Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p></p>
          </div>

          <!-- items -->
          <!-- row of items in cart from listCart state -->
          <div
            class="table--items2"
            v-for="(itemcart, i) in listCart"
            :key="itemcart.id"
          >
            <p>#{{ itemcart.item_code }} {{ itemcart.description }}</p>
            <p>
              <input type="text" class="input" v-model="itemcart.unit_price" />
            </p>
            <p>
              <input type="text" class="input" v-model="itemcart.quantity" />
            </p>
            <p v-if="itemcart.quantity">
              ???{{ itemcart.quantity * itemcart.unit_price }}
            </p>
            <p v-else></p>
            <p
              style="color: red; font-size: 24px; cursor: pointer"
              @click="removeItem(i)"
            >
              &times;
            </p>
          </div>

          <!-- opens add product modal -->
          <div style="padding: 10px 30px !important">
            <button class="btn btn-sm btn__open--modal" @click="toggleModal()">
              Add New Line
            </button>
          </div>
        </div>

        <div class="table__footer">
          <div class="document-footer">
            <p>Terms and Conditions</p>
            <textarea
              cols="50"
              rows="7"
              class="textarea"
              v-model="form.terms_and_conditions"
            ></textarea>
          </div>
          <div>
            <div class="table__footer--subtotal">
              <p>Sub Total</p>
              <span>??? {{ subTotal() }}</span>
            </div>
            <div class="table__footer--discount">
              <p>Discount</p>
              <input type="text" class="input" v-model="form.discount" />
            </div>
            <div class="table__footer--total">
              <p>Grand Total</p>
              <span>???{{ total() }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card__header" style="margin-top: 40px">
        <div></div>
        <div>
          <a class="btn btn-secondary" @click="onSave()"> Save </a>
        </div>
      </div>
    </div>
  </div>
  <!--==================== modal ====================-->

  <div class="modal main__modal" :class="{ show: showModal }">
    <div class="modal__content">
      <span class="modal__close btn__close--modal" @click="toggleModal()"
        >??</span
      >
      <h3 class="modal__title">Add Item</h3>
      <hr />
      <br />
      <div class="modal__items">
        <!-- list of available products from listproducts state -->
        <ul style="list-style: none">
          <li
            v-for="(item, i) in listproducts"
            :key="item.id"
            style="
              display: grid;
              grid-template-columns: 30px 350px 15px;
              align-items: center;
              padding-bottom: 5px;
            "
          >
            <p>{{ i + 1 }}</p>
            <a href="#">{{ item.item_code }}{{ item.description }}</a>
            <button
              @click="addCart(item)"
              style="
                border: 1px solid #e0e0e0;
                width: 35px;
                height: 35px;
                cursor: pointer;
              "
            >
              +
            </button>
          </li>
        </ul>
      </div>
      <br />
      <hr />
      <div class="model__footer">
        <button
          class="btn btn-light mr-2 btn__close--modal"
          @click="toggleModal()"
        >
          Cancel
        </button>
        <!-- <button class="btn btn-light btn__close--modal" @click="onSave()">
          Save
        </button> -->
      </div>
    </div>
  </div>
</template>
<template>
  <div class="container receipt" style="border: 1px solid black">
    <div class="receipt__header">
      <img
        class="receipt__header__logo"
        src="logoRP.svg"
        alt="republika ng pilipinas"
      />
      <div class="receipt__header__banner">
        <h1>OFFICIAL RECEIPT</h1>
        <p>Republic of the Philippines</p>
        <p>Province of Capiz</p>
        <h5>OFFICE OF THE TREASURER</h5>
        <p>Municipality of Capiz</p>
      </div>
      <img
        class="receipt__header__logo"
        src="logoCapiz.svg"
        alt="republika ng pilipinas"
      />
    </div>
    <div class="receipt__header">
      <img
        class="receipt__header__logo"
        src="logoRP.svg"
        alt="republika ng pilipinas"
      />
      <div class="receipt__header__banner">
        <h1>OFFICIAL RECEIPT</h1>
        <p>Republic of the Philippines</p>
        <p>Province of Capiz</p>
        <h5>OFFICE OF THE TREASURER</h5>
        <p>Municipality of Capiz</p>
      </div>
      <img
        class="receipt__header__logo"
        src="logoCapiz.svg"
        alt="republika ng pilipinas"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: serif;
  font-weight: bold;
  font-size: 1rem;
}

h5 {
  font-weight: bold;
  font-size: 0.8rem;
}

p {
  font-weight: bold;
  font-size: 0.7rem;
}

.receipt {
  width: 5in;
}

.receipt__header {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto;
  padding: 0.3rem;
  width: 4in;
  border: 2px solid black;
  border-radius: 1rem;
}

.receipt__header__banner {
  padding: 0 0.3rem;
}

.receipt__header__logo {
  height: 5rem;
}
</style>
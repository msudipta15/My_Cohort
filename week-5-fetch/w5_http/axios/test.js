const { default: axios } = require("axios");
const { log } = require("console");

async function currencydata() {
  const response = await axios.get(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
  );

  console.log(response.data["eur"]);
}

currencydata();

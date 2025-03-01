const axios = require("axios");

// fetch
async function main() {
  const response = await fetch("https://sum-server.100xdevs.com/todos");
  const json = await response.json();
  console.log(json.todos.length);
}

// axios

async function main() {
  const getdata = await axios.get("https://sum-server.100xdevs.com/todos");
  const putdata = await axios.put("https://sum-server.100xdevs.com/todos");
  const deletedata = await axios.delete(
    "https://sum-server.100xdevs.com/todos"
  );

  console.log(data.todos.length);
}

// To send body and headers with axios

async function main() {
  const data = await axios.post(
    "https://sum-server.100xdevs.com/todos",
    { username: "sudipta", password: "1234" }, // this is body
    {
      Headers: {
        authorisation: "stark 123", //this is headers
      },
    }
  );

  console.log(data.todos.length);
}

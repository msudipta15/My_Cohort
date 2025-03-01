async function getpost() {
  const response = await fetch("https://jsonplaceholder.org/posts/1");
  const json = await response.json();
  console.log(json);
}

getpost();

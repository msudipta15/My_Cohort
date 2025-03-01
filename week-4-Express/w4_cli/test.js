const fs = require("fs");

function main(file) {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const len = data.split(" ").length + 1;
      console.log(len);
    }
  });
}

main("a.txt");

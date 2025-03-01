// Creating own cli

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
program
  .name("counter")
  .description("CLI to to file based tasks")
  .version("1.0.1");

program
  .command("linecount")
  .description("count the number of lines in a text")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in the file`);
      }
    });
  });
program
  .command("wordcount")
  .description("count the number of lines in a text")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const words = data.split(" ").length + 1;
        console.log(`There are ${words} words in the file`);
      }
    });
  });

program.parse();

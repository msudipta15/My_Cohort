// Synchronously ( One by One)

const fs = require("fs")

const a = fs.readFileSync("file1.txt", "utf-8")
console.log(a)

const b = fs.readFileSync("a.txt", "utf-8")
console.log(b)



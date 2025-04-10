"use strict";
// Partial makes the parameters name age email optional
// Equivalant to name? age? email?
function displayuserName(user) {
    console.log(`Hello ${user.name} , you are ${user.age} years old.`);
}
// readonly makes the internal parameters non changeble
const fixuser1 = {
    name: "stark",
    age: 45,
};
// Now we can not change fixuser1.age and fixuser.name
// Alternate Syntax
const fixuser2 = {
    name: "john",
    age: 54,
};
let user11 = { phn: 9797979767 };
let user22 = {
    1: { age: 24, name: "stark" },
    2: { age: 43, name: "param" },
};
// Map
const users = new Map();
users.set("1", { age: 22, name: "stark" });
users.set("2", { age: 44, name: "haran" });
const user1 = users.get("1");
const user2 = users.get("2");
console.log(user1);
console.log(user2);

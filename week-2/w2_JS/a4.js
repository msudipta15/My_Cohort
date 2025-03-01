function greet(user) {
    if (user.age >= 18) {
        console.log("Hi " + user.name + " , you are eligible to Vote !")
    } else {
        console.log("Hi " + user.name + " , you are NOT eligible to Vote! ")
    }

}

// Object
let user1 = {
    "name": 'sudipta',
    "age": 24
}

let user2 = {
    "name": "Aryan",
    "age": 12
}

greet(user1)
greet(user2)
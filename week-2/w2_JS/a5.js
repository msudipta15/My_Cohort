// Create a function that takes an array of objects as inputs
// and returns the users with age more than 18 and male

function valid(user) {
    arr = []
    for (let i = 0; i < user.length; i++) {
        if (user[i].age > 18 && user[i].gender === "male") {
            arr.push(user[i])
        }
    }
    return arr
}

let users = [{
    "name": 'akash',
    "age": 12,
    'gender': 'male'
}, {
    "name": 'aryan',
    "age": 23,
    "gender": 'male'
}, {
    "name": "riya",
    "age": 23,
    "gender": "female"
}
]

console.log(valid(users))
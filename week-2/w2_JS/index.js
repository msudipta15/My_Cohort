function voter(arr) {
    new_arr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].age >= 18 && arr[i].sex === 'male') {
            new_arr.push(arr[i])
        }
    }
    return new_arr
}


let users = [{
    "name": "sudipta",
    "age": 22,
    "sex": "male"
}, {
    "name": "sudarshan",
    "age": 42,
    "sex": "male"
}, {
    "name": "soniya",
    "age": 17,
    "sex": "female"
}, {
    "name": "supriya",
    "age": 32,
    "sex": "female"
}, {
    "name": "ankita",
    "age": 23,
    "sex": "female"
}, {
    "name": "asif",
    "age": 12,
    "sex": "male"
}
]

console.log(voter(users))
let age = 15
console.log(`hi my name is sudipta, i am ${age} years old`)

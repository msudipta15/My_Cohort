const fs = require('fs');

function print(err, data) {
    if (err) {
        console.log('There is a error')
    }
    else {
        console.log(data)
    }
}

fs.readFile('b.txt', 'utf-8', print)




interface Person1 {
  name: string;
  age: number;
  address?: {
    city: string;
    state: string;
    pin: number;
  };
}

// Person1 is a custom type we made using interface

let user1: Person1 = {
  name: "asif",
  age: 29,
  address: {
    city: "Lucknow",
    state: "UP",
    pin: 766533,
  },
};

// address? is optional . To declare a parameter optional add ? with it

let user2: Person1 = {
  name: "laxman",
  age: 17,
};

function isLegal(user: Person1): boolean {
  if (user.age >= 18) {
    return true;
  } else {
    return false;
  }
}

const answer = isLegal(user1);
const answer2 = isLegal(user2);

if (answer) {
  console.log("I am legal to vote");
} else {
  console.log("I can not vote");
}

if (answer2) {
  console.log("I am legal to vote");
} else {
  console.log("I can not vote");
}

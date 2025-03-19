interface address {
  city: string;
  state: string;
  pin: number;
}

// Interfaces can use other interfaces

interface user {
  name: string;
  address: address;
}

interface office {
  address: address;
}

interface People {
  name: string;
  age: number;
  greet(): string;
}

let person: People = {
  name: "Stark",
  age: 24,
  greet() {
    return "hello";
  },
};

let greeting = person.greet();
console.log(greeting);

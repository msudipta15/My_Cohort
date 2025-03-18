// create your custom type for comple datatypes like objects and arrays

interface userType {
  name: string;
  age: number;
}

function greet2(user: userType) {
  console.log(`hello ${user.name} , your age is ${user.age}`);
}

let user: userType = {
  name: "ram",
  age: 24,
};

greet2(user);

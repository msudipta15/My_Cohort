interface Person {
  name: string;
  age: number;
  islegal(): boolean;
}

class Manager implements Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  islegal(): boolean {
    return this.age >= 18;
  }
}

let user = new Manager("john", 23);
console.log(user.age);
console.log(user.islegal());

class shape {
  area() {
    console.log("hi i am area");
  }
}

class Recatangle extends shape {
  width: number;
  length: number;

  constructor() {
    super(); // super() is the constructor of shape class
    this.width = 2;
    this.length = 3;
  }
}

const r = new Recatangle();
console.log(r.area());

interface user {
  name: string;
  id: number;
  age: number;
  createdAt: Date;
  email: string;
  password: string;
}

type UpdateProp = Pick<user, "name" | "age" | "email">;

type UpdatePropOptional = Partial<UpdateProp>;

// Partial makes the parameters name age email optional
// Equivalant to name? age? email?

function displayuserName(user: UpdateProp) {
  console.log(`Hello ${user.name} , you are ${user.age} years old.`);
}

interface fixuser {
  readonly name: string;
  readonly age: number;
}
// readonly makes the internal parameters non changeble

const fixuser1: fixuser = {
  name: "stark",
  age: 45,
};

// Now we can not change fixuser1.age and fixuser.name

// Alternate Syntax
const fixuser2: Readonly<fixuser> = {
  name: "john",
  age: 54,
};

// Record - A better way to give type to objects

type users1 = Record<string, number>;
type users2 = Record<number, { age: number; name: string }>;

let user11: users1 = { phn: 9797979767 };
let user22: users2 = {
  1: { age: 24, name: "stark" },
  2: { age: 43, name: "param" },
};

// Map  - Objects can be created by Map also
const users = new Map();

users.set("1", { age: 22, name: "stark" });
users.set("2", { age: 44, name: "haran" });

const user1 = users.get("1");
const user2 = users.get("2");

console.log(user1);
console.log(user2);

// we can specify the type in Map also

interface UseR {
  name: string;
  age: number;
  email: string;
}

const useRs = new Map<string, UseR>();

useRs.set("1", { name: "abdul", age: 22, email: "sdbwjd@hm.com" });

type event = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<event, "scroll">;

const handleevent = (event: ExcludeEvent) => {
  console.log(`Handling event ${event}`);
};

handleevent("click");

function helloworld(fname: string) {
  console.log(`Hello ${fname}`);
}

helloworld("sudipta");

function sum(a: number, b: number) {
  let total = a + b;
  console.log(total);
}

sum(5, 3);

function ageCheck(age: number) {
  if (age < 18) {
    console.log("You are Not an Adult !");
  } else {
    console.log("Congrats,You are eligable to Vote !");
  }
}

ageCheck(22);
ageCheck(17);

function delayedcall(fn: () => void) {
  setTimeout(fn, 2000);
}

// fn : () => void means the function does not take any input and returns nothing
// fn : () => number or string , we can specify if the function returns anything

delayedcall(() => {
  console.log("Hello after 2 sec");
});

function greet(name: string) {
  console.log(`hello ${name} after 2 sec `);
}

function delayedcall2(fn: (name: string) => void, name: string) {
  setTimeout(() => fn(name), 2000);
}

delayedcall2(greet, "stark");

function maxnum(array: number[]) {
  let maxnum = -9999999999;
  for (let i = 0; i <= array.length; i++) {
    if (array[i] > maxnum) {
      maxnum = array[i];
    }
  }
  console.log(maxnum);
}

maxnum([4, 9, 2]);

let books: string[] = ["hp", "got"];
type stnum = string | number;
let random: stnum[] = ["hello", 3, 4];

// ASSIGNMENT

interface usertype {
  fname: string;
  lname: string;
  age: number;
}

function eligbleVoterList(array: usertype[]) {
  const voters = array.filter((a) => a.age >= 18);
  console.log(voters);
}

let voterlist: usertype[] = [
  { fname: "pratik", lname: "mehta", age: 17 },
  { fname: "abdul", lname: "molla", age: 37 },
  { fname: "akay", lname: "kohli", age: 21 },
  { fname: "roshni", lname: "ray", age: 18 },
  { fname: "avay", lname: "koli", age: 12 },
];

eligbleVoterList(voterlist);

interface data1 {
  name: string;
  age: number;
}

type data2 = {
  name: string;
  age: number;
};

// type supports unions and intersections

type employees = {
  name: string;
  startdate: string;
};

type manager = {
  name: string;
  department: string;
};

type teamLead = employees & manager;

let e: employees = {
  name: "harpreet",
  startdate: "2/8/24",
};

let m: manager = {
  name: "param",
  department: "technical support",
};

let t: teamLead = {
  name: "akash",
  department: "HR",
  startdate: "2/6/17",
};

type good = {
  name: string;
  gift: string;
};

type bad = {
  name: string;
  ip: string;
};

type avg_user = good | bad;

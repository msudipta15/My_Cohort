import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const todoatomFamily = atomFamily({
  key: "todoatomfamily",
  default: selectorFamily({
    key: "todoselectorfamily",
    get: (id) => {
      async ({ get }) => {
        const res = await axios.get(`example.com/todo?id=${id}`);
        return res.data.todo;
      };
    },
  }),
});

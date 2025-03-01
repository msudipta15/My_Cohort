import axios from "axios";
import { atom, selector } from "recoil";

// for async queries create atom with default value as a selector

// The below link does not work

export const notifications = atom({
  key: "notificationatom",
  default: selector({
    key: "networkatomselector",
    get: async () => {
      const response = await axios.get(
        "http://sum-server.100xdevs.com/notifications"
      );
      return response.data;
    },
  }),
});

export const totalselector = selector({
  key: "totalselector",
  get: ({ get }) => {
    const values = get(notifications);
    return (
      values.jobs + values.network + values.notifications + values.messaging
    );
  },
});

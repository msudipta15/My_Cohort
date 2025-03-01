import { atom, selector } from "recoil";

export const topbarAtom = atom({
  key: "topbar",
  default: {
    notification: 72,
    jobs: 12,
  },
});

export const messageAtom = atom({
  default: 0,
  key: "message",
});

export const totalSelector = selector({
  key: "totalselector",
  get: ({ get }) => {
    const notification = get(topbarAtom).notification;
    const message = get(messageAtom);
    const jobs = get(topbarAtom).jobs;

    const total = notification + message + jobs;

    return total;
  },
});

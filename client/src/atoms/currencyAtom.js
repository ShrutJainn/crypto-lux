import { atom } from "recoil";

const currencyAtom = atom({
  key: "currencyAtom",
  default: "INR",
});

export default currencyAtom;

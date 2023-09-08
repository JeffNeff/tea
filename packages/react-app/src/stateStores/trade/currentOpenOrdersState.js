import { atom } from "recoil";

const currentOpenOrdersState = atom({
    key: "currentOpenOrdersState",
    default: []
})

export default currentOpenOrdersState
import { atom } from "recoil";

const tradeInProgressState = atom({
    key: "tradeInProgressState",
    default: false
})

export default tradeInProgressState
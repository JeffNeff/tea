import { atom } from "recoil";

const transactionFeeState = atom({
    key: "transactionFeeState",
    default: 0
})

export default transactionFeeState
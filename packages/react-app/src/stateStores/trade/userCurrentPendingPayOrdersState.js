import { atom } from "recoil";

const userCurrentPendingPayOrdersState = atom({
    key: "userCurrentPendingPayOrdersState",
    default: [],
})

export default userCurrentPendingPayOrdersState
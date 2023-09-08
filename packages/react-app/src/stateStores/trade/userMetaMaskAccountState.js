import { atom } from "recoil";

const userMetaMaskAccount = atom({
    key: "userMetaMaskAccount",
    default: 0x000
})

export default userMetaMaskAccount
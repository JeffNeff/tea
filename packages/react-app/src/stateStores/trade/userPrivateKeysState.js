import { atom } from "recoil";

const userPrivateKeysState = atom({
    key: "userPrivateKeysState",
    default: []
})

export default userPrivateKeysState
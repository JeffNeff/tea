import { atom } from "recoil";

const publicPrivateState = atom({
    key: "publicPrivateState",
    default: "public"
})

export default publicPrivateState
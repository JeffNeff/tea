import { atom } from "recoil";

const shippingAddressState = atom({
    key: "shippingAddressState",
    default: ""
})

export default shippingAddressState
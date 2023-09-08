import {atom} from "recoil";

const stepStatusState = atom({
    key: "stepStatusState",
    default: "start"
})

export default stepStatusState
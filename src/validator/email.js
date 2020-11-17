import { warningLabel, normalLabel, noMessage  } from "./config"
import v from "validator"

export const checkEmail = (email,setEmailValidator) => {
    let result = false
    if(!v.isEmail(email)) {
        setEmailValidator({
                labelClassName: warningLabel,
                warningMessage:(<p className="text-danger small mx-0 my-0 mt-1"> invalid email, eg valid email: abc@mail.com </p>)
        })

    }
    else {
        setEmailValidator({
            labelClassName: normalLabel,
            warningMessage: noMessage
        })
        result = true
    }
    return result
  }
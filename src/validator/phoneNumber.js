import { warningLabel, normalLabel, noMessage  } from "./config"
import v from "validator"

export const checkPhoneNumber = (phoneNumber,setPhoneNumber) => {
    let result = false
    console.log("phonelength", phoneNumber.length)

    if(!v.isMobilePhone(phoneNumber)){
        setPhoneNumber({
                labelClassName: warningLabel,
                warningMessage:(<p className="text-danger small mx-0 my-0 mt-1"> invalid phone number, eg : 1234567890</p>)
        }) 
    }
    else if(phoneNumber.length < 10 || phoneNumber.length > 15) {
        setPhoneNumber({
            labelClassName: warningLabel,
            warningMessage:(<p className="text-danger small mx-0 my-0 mt-1"> phone number must be between 10 and 15 characters </p>)
        }) 
    }
    else{
        setPhoneNumber({
            labelClassName: normalLabel,
            warningMessage: noMessage
        })
        result = true
    }

    return result

  }
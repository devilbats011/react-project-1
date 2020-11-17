import { warningLabel, normalLabel, noMessage  } from "./config"

export const checkPassword = (password,setPasswordValidator) => {
    let result = false
    const passLength = password.length
    if(passLength < 8){
        setPasswordValidator({
                labelClassName: warningLabel,
                warningMessage:(<p className="text-danger small mx-0 my-0 mt-1"> password must at least 8 characters </p>)
        }) 
    }
    else{
        setPasswordValidator({
            labelClassName: normalLabel,
            warningMessage: noMessage
        })

        result = true
    }

    return result

  }

export const confirmPassword = (cPass,pass,setConfirmPasswordValidator) => {
    let result = false
    if(cPass !== pass){
        setConfirmPasswordValidator({
                labelClassName: warningLabel,
                warningMessage:(<p className="text-danger small mx-0 my-0 mt-1"> password and confirm password must be the same </p>)
        }) 
    }
    else{
        setConfirmPasswordValidator({
            labelClassName: normalLabel,
            warningMessage: noMessage
        })
        result = true
    }
    return result
  }
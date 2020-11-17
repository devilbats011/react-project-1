import { warningLabel, normalLabel, noMessage, emptyMessage, specials, no_numbers  } from "./config"
import v from "validator"

export const checkName = (name,setName) => {
    let result = false
    if(v.isEmpty(name) ){
        setName({
                labelClassName: warningLabel,
                warningMessage: emptyMessage
        }) 
    }
    else if(!no_numbers.test(name)) {
        setName({
            labelClassName: warningLabel,
            warningMessage: (<p className="text-danger small mx-0 my-0 mt-1"> Numbers are not allow </p>)
        }) 
    }
    else if(specials.test(name)) {
        setName({
            labelClassName: warningLabel,
            warningMessage: (<p className="text-danger small mx-0 my-0 mt-1"> Most special characters are not allow </p>)
        }) 
    }
    else{
        setName({
            labelClassName: normalLabel,
            warningMessage: noMessage
        })
        result = true
    }
    return result

  }
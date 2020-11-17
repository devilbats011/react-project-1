export const warningLabel = "text-danger text-dot9rem"
export const normalLabel = "text-muted text-dot9rem"
export const noMessage = (<p className="d-none"></p>)

export const specials = /[~,.!?$&*<>;:"/[\]@?#|{}()=_+-]/
export const no_numbers = /^[^0-9]+$/

export const emptyMessage = (<p className="text-danger small mx-0 my-0 mt-1"> this field cannot be empty </p>)
export const accountNotFoundMessage = (<p className="my-2 text-danger text-center" > Account not found </p>)
export const accountAlreadyRegistered = (<p className="my-1 mb-2 text-danger text-center" > Account already registered  </p>)
export const termsRequired  = (<p className="my-0 text-danger text-left small" > Terms and condition are required! </p>) 
export const DEFAULT_V_DATA = {
    labelClassName: normalLabel,
    warningMessage: noMessage     
}
export const customeMessage = (msg) => {
    return (<p className="my-1 mb-2 text-danger text-center" > { msg }  </p>)
}
export const clearValidateHandler = (value,setValidator) =>{
    if(value === ""){
        setValidator(DEFAULT_V_DATA)
    }
    if(value === true)
    {
        setValidator(DEFAULT_V_DATA)
    }
}
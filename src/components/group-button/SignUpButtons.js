import React,{ Fragment, useState
    //,useEffect
 }  from 'react'
import {
    Form,
    // Button,
    // InputGroup
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as validate from "./../../validator"
import ReactLoading from 'react-loading'
import Btx from "./../buttons/Button"

function SignUpButtons({setForm,form,submitHandler,isLoading}) {

    const [firstNameValidator,setFirstNameValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [lastNameValidator,setLastNameValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [emailValidator,setEmailValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [phoneValidator,setPhoneValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [passwordValidator,setPasswordValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [confirmPasswordValidator,setConfirmPasswordValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [termsValidator,setTermsValidator] = useState(validate.constx.DEFAULT_V_DATA)


    const firstNameHandler = (e) => {
        validate.checkName(e.target.value,setFirstNameValidator)
        setForm({...form, firstName: e.target.value})
    }

    const lastNameHandler = (e) => {
        validate.checkName(e.target.value,setLastNameValidator)
        setForm({...form, lastName: e.target.value})
    }

    const emailHandler = (e) => {
        validate.checkEmail(e.target.value,setEmailValidator)
        setForm({...form, email: e.target.value})
    }

    const phoneHandler = (e) => {
        validate.checkPhoneNumber(e.target.value,setPhoneValidator)
        setForm({...form, phoneNumber: e.target.value})
    }
      
    const passwordHandler = (e) => {
        validate.checkPassword(e.target.value,setPasswordValidator)
        setForm({...form, password: e.target.value})
    }

    const confirmPasswordHandler = (e) => {
        validate.confirmPassword(e.target.value,form.password,setConfirmPasswordValidator)
        setForm({...form, confirm_password: e.target.value})   
    }
      
    const termsHandler = (e) => {
        // console.warn("terms:" ,e.target.checked , e.target)
        const value = e.target.checked
        setForm({...form, terms: value})
        if(!value){
            setTermsValidator({...termsValidator, warningMessage: validate.constx.termsRequired })
        }
        else {
            validate.constx.clearValidateHandler(e.target.checked, setTermsValidator)
        }
        
    }

    /*
       Check validate all the inputs when USER hit continue button, 
       WHEN all validate pass then submitHandler() executed
    */
    const submitCheckInputs = () => {
        let first,last,email,phone,pass,cpass,terms
        first = last = email = phone = pass = cpass = terms = false

        first = validate.checkName(form.firstName, setFirstNameValidator)
        last = validate.checkName(form.lastName, setLastNameValidator)
        email = validate.checkEmail(form.email, setEmailValidator)
        phone = validate.checkPhoneNumber(form.phoneNumber, setPhoneValidator)
        pass = validate.checkPassword(form.password, setPasswordValidator)
        cpass = validate.confirmPassword(form.confirm_password, form.password ,setConfirmPasswordValidator)

        if(!form.terms){
            setTermsValidator({...termsValidator, warningMessage: validate.constx.termsRequired })
        }
        else if(form.terms) {
            terms = true
        }

        if(first && last && email && phone && pass && cpass && terms){
            submitHandler()
        }
    }

    return (
        <Fragment>
        <Form className="d-flex flex-column flex-md-row" >
        <section className="form-row border-check-off  col-12 mx-0 px-0" >
                <div className="form-group col-12 col-md-12 col-lg-6" >
                    <label className={firstNameValidator.labelClassName}>First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="" onChange={(e) => { firstNameHandler(e)} } onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setFirstNameValidator)}} />
                    {firstNameValidator.warningMessage}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                    <label className={lastNameValidator.labelClassName} >Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="" onChange={(e) => { lastNameHandler(e) }} onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setLastNameValidator)}} />
                    {lastNameValidator.warningMessage}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6" >
                    <label  className={emailValidator.labelClassName} >Email</label>
                    <input type="email" className="form-control" id="email" placeholder="" onChange={(e) => { emailHandler(e) }} onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setEmailValidator)}} />
                    {emailValidator.warningMessage}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6">
                    <label className={phoneValidator.labelClassName} >Mobile No</label>
                    <input type="text" className="form-control" id="mobileNo" placeholder="" onChange={(e) => { phoneHandler(e) }} onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setPhoneValidator)}} />
                    {phoneValidator.warningMessage}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6" >
                    <label  className={passwordValidator.labelClassName} >Password</label>
                    <input type="password" className="form-control" id="password" placeholder="" onChange={(e) => {passwordHandler(e)}} onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setPasswordValidator)}} />
                    {passwordValidator.warningMessage}
                </div>
                <div className="form-group col-12 col-md-12 col-lg-6" >
                    <label className={confirmPasswordValidator.labelClassName} >Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" placeholder="" onChange={(e) => { confirmPasswordHandler(e) }} onBlur ={(e)=>{validate.constx.clearValidateHandler(e.target.value,setConfirmPasswordValidator)}} />
                    {confirmPasswordValidator.warningMessage}
                </div>

                <div className="form-check mt-1 col-12 pl-4">
                     <input type="checkbox" className="form-check-input" id="term-signup" onChange={(e) => { termsHandler(e) }} />   {/*onBlur ={(e)=>{ validate.constx.clearValidateHandler(e.target.value,setTermsValidator) }}  */}
                    <label className="" style={{fontSize:"14px",position:"relative",top:"-2px"}} >I agree to the <strong><u> terms of use  </u> </strong> and <strong><u>privacy policy</u></strong></label>
                    {termsValidator.warningMessage}
                </div>

                <Btx className="py-2 px-3 mt-3" disabled={isLoading} onClick={() => { submitCheckInputs() }}  >
                    {isLoading ? <ReactLoading type={"cylon"} color={'#fff'} height={15} width={50} className="button-loading__signup" />  : <div className="font-weight-bold font-size-10" style={{  fontSize: "14px"}} >  Continue  </div> }
                </Btx>

        </section>

        </Form>

        </Fragment>
    )
}

export default SignUpButtons

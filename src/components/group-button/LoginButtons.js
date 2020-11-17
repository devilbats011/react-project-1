import React,{ Fragment,
    // useState,
    // useEffect
 }  from 'react'
import {
    Form,
    //Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as validate from "./../../validator";
import ReactLoading from 'react-loading'
import {
    Link
  } from "react-router-dom"
import Btx from "./../buttons/Button";

function LoginButtons({setEmail,setPassword,submitHandler,isLoading,emailValidator,setEmailValidator,passwordValidator,setPasswordValidator}) {

    const emailChangehandler = (e) =>{
        const email  = e.target.value
        validate.checkEmail(email,setEmailValidator)
        setEmail(email)
    }

    const passwordChangehandler = (e) =>{
        const pass  = e.target.value
        validate.checkPassword(pass,setPasswordValidator)
        setPassword(pass)
    }

    return (
      <Fragment>
         
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label className={emailValidator.labelClassName} > Email address </Form.Label>
                <Form.Control type="email" placeholder="Email" onChange={(e)=>{emailChangehandler(e)}} onBlur={ (e)=>{validate.constx.clearValidateHandler(e.target.value,setEmailValidator)} } />
                {emailValidator.warningMessage}
            </Form.Group>

            <div className="d-flex justify-content-between my-0 border-check-off" >
                <Form.Label className={passwordValidator.labelClassName + " my-0 p-0"} >  Password  </Form.Label>
                <Form.Label className="text-mango my-0 p-0 font-weight-bold small click-btn" > Forgot Password? </Form.Label>
            </div>
            <Form.Control type="password" placeholder="Password" className="my-1 mb-3" onChange={(e)=>{passwordChangehandler(e)}} onBlur={ (e)=>{validate.constx.clearValidateHandler(e.target.value,setPasswordValidator)} } />
                {passwordValidator.warningMessage}
        </Form>
        <div className="form-check my-3">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                      <label className="" style={{fontSize:"14px",position:"relative",top:"-2px"}} >remember me</label>
        </div>
                      {/* <Button onClick={()=>{ submitHandler() }} className="py-1 px-3 mango border-0" disabled={isLoading} >
                            <div className="font-weight-bold font-size-10 py-1 position-relative" style={{  fontSize: "14px", }} >
                                {isLoading ? <ReactLoading type={"cylon"} color={'#fff'} height={15} width={50} className="button-loading__login" /> : <div>Login</div>}
                            </div> 
                      </Button> */}
                      <Btx  onClick={()=>{ submitHandler() }} className="border-0" disabled={isLoading} >
                            <div className="font-weight-bold font-size-10 py-1 position-relative" style={{  fontSize: "14px", }}  >
                                {isLoading ? <ReactLoading type={"cylon"} color={'#fff'} height={15} width={50} className="button-loading__login" /> : <div>Login</div>}
                            </div> 
                      </Btx>

        <div className="my-3 text-dot9rem"> Don't have an account ? <Link className="text-mango mango-hover font-weight-bold"  to="/sign-up">Sign up </Link> </div>
                    

      </Fragment>
    )
}

export default LoginButtons

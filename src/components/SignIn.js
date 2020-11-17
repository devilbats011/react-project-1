import React, {
//  Fragment
    useState,
    useEffect
} from 'react'
import {
    Container,
    Row,
    Col,
   } from 'react-bootstrap'
import FbGoogleButtons from "./group-button/FbGoogle"
import LoginButtons from "./group-button/LoginButtons"
import no_image from "./../images/no-image.jpg"
import * as validate from "./../validator";
import {
  useHistory,
} from "react-router-dom"
import {
   useDispatch
// useSelector
   } from "react-redux"
import { 
  login,
  SUCCESS_LOGIN
 } from "./../redux/user/action"
import validator from "validator"
import { LOG_IN_TRUE } from "./../route/config";
import HeaderOne from "./Titles/HeaderOne"



function SignIn({isLogin}) {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [LoginErrorMessage,setLoginErrorMessage] = useState((<p className="d-none"></p>))

    const [emailValidator,setEmailValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const [passwordValidator,setPasswordValidator] = useState(validate.constx.DEFAULT_V_DATA)
    const history = useHistory()
    const dispatch = useDispatch()
    
    useEffect(() => {
      if(isLogin === LOG_IN_TRUE) {
        history.push("/dashboard")
      }
    }, [history, isLogin])

    useEffect(() => {
        console.log("_email__",email)
        console.log("_password__",password)
        return () => {
        }
    }, [email, password])

    // const authToken = useSelector(state => state.user.authToken)


    const submitHandler = async () => {
    if(validator.isEmail(email) && !validator.isEmpty(password)) {
        setIsLoading(true)
        const result = await dispatch(login({
          email: email,
          password:password
        }))

        if(result.isError){
          setIsLoading(result.loading)
          setLoginErrorMessage(validate.constx.accountNotFoundMessage)
          console.log("message: ", result.message)
        }
        else if(result === SUCCESS_LOGIN){
          // console.log("RESULT_",result)
          history.push("/dashboard")
        }
    }
    else {
      console.log("email or password something went wrong there..")
      // console.log("_email__",email)
      // console.log("_password__",password)
      validate.checkEmail(email, setEmailValidator)
      validate.checkPassword(password, setPasswordValidator)
    }
  }

    return (
      <div className="border-check-off">
      <Container className="border-check-off">
        <HeaderOne/>
        <Row>
            <Col lg={{ span: 5, offset: 1 }} className="border-clear px-0" >
                  <main className="App-main py-2 ml-3">
                    <Container>
                      <h2 className="font-weight-bolder text-lg-left" > Sign In </h2>
                      <FbGoogleButtons setIsLoading={setIsLoading} />

                      <div className="d-flex" >
                        <div className="half-line"> </div><div className="text-center position-relative" style={{ width:"10%",top:"-12px"}}>or </div> <div className="half-line" > </div>
                      </div>
                      
                      {LoginErrorMessage}
                      <LoginButtons setEmail={setEmail} setPassword={setPassword} submitHandler={submitHandler} isLoading={isLoading}     emailValidator={emailValidator} setEmailValidator={setEmailValidator} passwordValidator={passwordValidator} setPasswordValidator={setPasswordValidator} />
                      
                    </Container>
                  </main>
            </Col>

            <Col lg={{ span: 6, offset: 0 }} className="border-clear text-center px-0" >
                <main className="App-Img border-check-off py-3" style={{height:'480px'}}>
                  <img src={no_image} className="img-fluid"  alt="foo baa" style={{height:"100%"}} />
                </main>
          </Col>
          </Row>
      </Container>
    </div>
    )
}

export default SignIn

import React,{ 
   useState
  ,useEffect } from 'react'
import {
    Container,
    Row,
    Col
   } from 'react-bootstrap';
import FbGoogleButtons from "./group-button/FbGoogle"
import SignUpButtons from "./group-button/SignUpButtons"
import no_image from "./../images/no-image.jpg"
import { signUp } from "./../redux/user/action"
import {
  useDispatch,
  // useSelector 
} from "react-redux"
import { useHistory } from "react-router-dom";
import * as validate from "./../validator";
import { SUCCESS_REGISTER } from "./../redux/user/action";
import HeaderOne from "./Titles/HeaderOne"

// {
//   signUpSuccess: false,
//   other: false
// }
function SignUp({setToasts,toasts}) {
  const dispatch = useDispatch() 
  const history = useHistory()
  const [form,setForm] = useState({
      firstName:"",
      lastName:"",
      fullName: "",
      email: "",
      password: "",
      confirm_password:"",
      phoneNumber: "",
      term: false,
      buttonIsDisabled: false
    })

    const [isLoading,setIsLoading] = useState(false)
    const [LoginErrorMessage,setLoginErrorMessage] = useState((<p className="d-none"></p>))



    useEffect(() => {
      console.log(SignUp.name)
      setForm({...form,fullName:`${form.firstName} ${form.lastName}`})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.firstName, form.lastName]) 

    const submitHandler = async () => {
       setIsLoading(true)
        const result = await dispatch(signUp(form))
        if(result.isError) {
          const badError = result
          if(badError.isError){
            setIsLoading(badError.loading)
            setLoginErrorMessage(validate.constx.customeMessage(badError.message))
            console.log("message: ", badError.message)
          }
        }
        else if(result === SUCCESS_REGISTER) {
          setToasts({...toasts,signUpSuccess: true})
          history.push("/")
        }
        console.log(result)
        return 
    }

    return (
      <div className="border-check-off">
        <Container className="border-check-off">
        <HeaderOne/>

          <Row>
            <Col lg={{ span: 5, offset: 1 }} className="border-clear px-0" >
                  <main className="App-main py-2 ml-3">
                    <Container>
                      <h2 className="font-weight-bolder text-lg-left" >Sign Up</h2>
                      <FbGoogleButtons setIsLoading={setIsLoading} />
                        <div className="d-flex" >
                          <div className="half-line"> </div><div className="text-center position-relative" style={{ width:"10%",top:"-12px"}}>or </div> <div className="half-line" > </div>
                        </div>
                        {LoginErrorMessage}
                      <SignUpButtons setForm={setForm} form={form} submitHandler={submitHandler} isLoading={isLoading} />
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

export default SignUp

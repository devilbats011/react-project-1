import React,{Fragment} from 'react'
import Button from 'react-bootstrap/Button';
import google from "./../../google.svg"
import fb from "./../../fb.svg"
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
  useDispatch,
  // useSelector 
} from "react-redux"
import { fbSignIn, googleSignIn } from "./../../redux/user/action"
import { useHistory } from "react-router-dom";
import validator from "validator"

function FbGoogle({setIsLoading}) {
  const dispatch = useDispatch()
  const history = useHistory()

  const responseGoogle = async (response) => {
    console.log("__response-google_ ",response)
    if(response.error !== undefined) {
      setIsLoading(false)
      console.log("__response-google_error ",response.error )
      return
    }
    setIsLoading(true)
    const result = await dispatch(googleSignIn(response))
    if(!validator.isEmpty(result)){
      // console.log("inside_responseGoogle_",result)
      redirect()
   }
   else {
     console.log("something went wrong...", "__result_", result)
   }
    
  }

  const responseFacebook = async (response) => {
    if(response.status !== undefined || response.status === "unknown") {
      setIsLoading(false)
      console.log("__response-fb_error ",response.status)
      return
    }
    setIsLoading(true)
    console.log("__response-fb_ ",response)
    const result = await dispatch(fbSignIn(response))
    if(!validator.isEmpty(result)){
       redirect()
    }
    else {
      console.log("something went wrong...", "__result_", result)
    }
  }

  const redirect = ()=>
  {
    history.push("/dashboard")
  }

    return (
        <Fragment>
          <section className="d-flex flex-column flex-md-row flex justify-content-between border-check-off my-4 btn-group-1-off">

          <FacebookLogin
            appId="1323894341284181"
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
              <Button variant="white" className="btn-type-1 mr-md-2 " onClick={renderProps.onClick} >
                <img src={fb} className="logo-type-1 mx-1 mr-2" alt="fb-icon" />
                <span className="font-weight-bold text-dot9rem mr-5" > Facebook </span>
              </Button>
            )}
          />
          <GoogleLogin
            clientId="281757645030-21l004265hl48bkook82no73bd5c0102.apps.googleusercontent.com"
            render={renderProps => (
              <Button variant="white" className="btn-type-1 ml-md-2" onClick={renderProps.onClick} disabled={renderProps.disabled} >
                <img src={google} className="logo-type-1 mx-1 mr-2 " alt="google-icon" />
                <span className="font-weight-bold text-dot9rem mr-5" > Google </span>
              </Button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          

          </section>
        </Fragment>
    )
}

export default FbGoogle

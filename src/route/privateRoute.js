import React,{ useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
// import validator from "validator";
import { LOG_IN_TRUE } from "./config";
import { useDispatch } from "react-redux"
import * as action from "./../redux/user/action";
function PrivateRoute({component:Component,...rest}) {

    const isLogin = ()=>{

        let sessionLogin =  sessionStorage.getItem('isLogin')
        // let sessionAuth = sessionStorage.getItem('authToken')


        if(sessionLogin === null || sessionLogin === undefined || sessionLogin === "") {
            sessionLogin = "LOG_IN_FALSE"
            // sessionAuth = "NO_AUTH"
            // console.log("sessionLogin", sessionLogin)
        }
        return ( sessionLogin  === LOG_IN_TRUE ) ? true : false
    }
    
    const dispatch = useDispatch()
    const [userProfile,setUserProfile] = useState({})

    function fetchUserProfile() {
        if(isLogin) {
            const result = dispatch(action.profile())
            return result
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const user = await fetchUserProfile()
        setUserProfile(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route {...rest} render={props => ( isLogin() ?  <Component userProfile={userProfile} setUserProfile={setUserProfile} {...props} /> : <Redirect to="/" />
        )} />
    )
}

export default PrivateRoute

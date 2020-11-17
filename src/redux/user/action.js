import usersApi from "./apiConfig";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN"
//get the user profile using user aboutme Api
export const STORE_PROFILE = "STORE_PROFILE"
export const LOADING = "LOADING"
export const STORE_EMAIL_PASS = "STORE_EMAIL_PASS"
export const SIGN_UP_FORM = "SIGN_UP_FORM"
export const SUCCESS_REGISTER = "SUCCESS_REGISTER"

// eslint-disable-next-line no-unused-vars
const AccountAlreadyRegistered = (err) => {
    console.log(err)
    const error = {
        isError: true,
        message: "Existed Account ",
        loading: false
    }
    return error
}

const BadRequest = (err) => {

    let msg = "somewhere went wrong"
    console.log(err.response.data.errors,"badrequest")
    if(err.response.data.errors !== undefined) {
        msg = err.response.data.errors[0].message
    }
    const error = {
        isError: true,
        message: msg,
        loading: false
    }
    return error
}

const AccountNotFound = (err) => {
    console.log(err)
    const error = {
        isError: true,
        message: "Account not found",
        loading: false
    }
    return error
}

//public-api--start
/*
credential {
  email,
  password
 }
*/
export const login = (credential) => (dispatch)=>{
    return usersApi.post("/signin",credential)
    .then((result)=> {
        const userInfo = result.data
        const resultx = dispatch(successLogin(userInfo))
        console.log("resultxLOGIN_",resultx)
        return resultx.type
    })
    .catch((err)=>{
        // dispatch(loading(false))
        return AccountNotFound(err)
    })
}

//login and register thru fb
export const fbSignIn = (credential) => (dispatch) => {
    const trimmedCredential = {
        name: credential.name,
        email: credential.email,
        facebookId: credential.id
    }

    return usersApi.post("/facebook/signin",trimmedCredential).then((result)=> {
        const userInfo = result.data
        /*eg:
            userData {
                "user": {
                    "id": "9ca9f090-f678-42e2-8000-904791a34556",
                    "name": "John Smith",
                    "email": "johnsmith@email.com",
                    "phoneNumber": null,
                    "createdAt": "2020-11-11T04:25:21.000Z",
                    "updatedAt": "2020-11-11T04:25:21.000Z"
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljYTlmMDkwLWY2NzgtNDJlMi04MDAwLTkwNDc5MWEzNDU1NiIsImVtYWlsIjoiam9obnNtaXRoQGVtYWlsLmNvbSIsImlhdCI6MTYwNTA2ODcyMn0.sBr9bRXmvhuYvsWpHL3Y6_iop9pfZA81tFLR6FPzGe4"
            }
        */
        const userData = dispatch(successLogin(userInfo))
        // console.log("result-fb__",userData)
        return userData.type

    })
    .catch((err)=>{
        // dispatch(loading(false))
        return AccountNotFound(err)
    })
}

//login and register thru google
export const googleSignIn = (credential) => (dispatch) => {
    const trimmedCredential = {
        name: credential.profileObj.givenName,
        email: credential.profileObj.email,
        googleId: credential.tokenId
    }
    return usersApi.post("/google/signin",trimmedCredential).then((result)=> {
        const userInfo = result.data
        const userData = dispatch(successLogin(userInfo))
        // console.log("result-google__",userData)
        return userData.type
    })
    .catch((err)=> {
        // dispatch(loading(false))
        return AccountNotFound(err)
    })
}

/*
form
{
    firstName,
    lastName,
    fullName,
    email,
    password,
    confirm_password,
    phoneNumber
    }
*/
export const signUp =  (form) =>  (dispatch)=>{
    const newForm =  {
        name: form.fullName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber
    }
       
    return usersApi.post("/signup",newForm)
    .then((result)=> {
        const userInfo = result.data
        console.log("action/signUp","__userInfo_",userInfo)
        const res = dispatch(successRegister(userInfo))
        return res.type
    })
    .catch((err)=>{
        // console.log(err.response.data.errors,"#1#",err.response.data.x !== undefined)
        return BadRequest(err)
    })
}
//public-api--end

//private--start
export const profile = () => (dispatch) => {
    usersApi.defaults.headers.common["Authorization"] = sessionStorage.getItem('authToken')
    return usersApi.get("/aboutme")
    .then((result)=> {
        const userProfile = result.data
        dispatch(storeProfile(userProfile))
        return userProfile
    })
    .catch((err)=>{
        throw err
    })
} 
//private-end

export const successRegister = (userInfo) => {
    return {
        type: SUCCESS_REGISTER,
        payload:{
            loading: false,
            data: userInfo
        }
    }
}

/***
 userInfo {
    token,
    name,
    email,
    phoneNumber,
    ...
}
**/
export const successLogin = (userInfo) =>{
    //klu nk tukar nnt just map jee laa kan

    return {
        type: SUCCESS_LOGIN,
        payload: {
            loading: false,
            data: userInfo
        }

    }
}

/***
 userProfile {
    name,
    email,
    phoneNumber,
    ...
}
**/
export const storeProfile = (userProfile) =>{
    return {
        type: STORE_PROFILE,
        payload: {
            loading: false,
            data: userProfile
        }

    }
}

/*
 emailPassword {
     email,
     password
 }
*/
export const storeEmailPass = (emailPassword) => { 
    return {
        type: STORE_EMAIL_PASS,
        payload: {
            email: emailPassword.email,
            password: emailPassword.password
        }
    }
}
export const loading = (isLoad) =>{
    return {
        type: LOADING,
        payload: {
            loading: isLoad
        }

    }
}





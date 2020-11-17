import { 
    SUCCESS_LOGIN,
    LOADING,
    STORE_EMAIL_PASS,
    SUCCESS_REGISTER,
    STORE_PROFILE
} from "./action.js"
import { LOG_IN_TRUE } from "./../../route/config"

const initState = {
    loading: true,
    authToken: sessionStorage.getItem('authToken'),
    users: [],
    user: {},
    profile: {},
    email:"",
    password:"",
    signUpForm:{
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    }
}
   

const reducer = (state = initState, action) => {
  const payload = action.payload
  switch (action.type) {
    case LOADING: {
        state.loading = payload.loading
        return state
    }
    case SUCCESS_LOGIN: {
        // console.log(`-- ${SUCCESS_LOGIN} -- `)
        // console.log("__action__",action,"__action.payload__",action.payload)
        state.loading = payload.loading
        sessionStorage.setItem('authToken', payload.data.token)
        sessionStorage.setItem("isLogin", LOG_IN_TRUE)
        state.user = payload.data.user
        state.authToken = sessionStorage.getItem('authToken')
        // console.log("__state_", state,"__sessionStorage_",sessionStorage)
        return state
    }
    case SUCCESS_REGISTER: {
        console.log(`-- ${SUCCESS_REGISTER} -- __payload.data_ ${payload.data} `)
        state.loading = payload.loading
        return state
    }
    case STORE_EMAIL_PASS: {
        console.log(`-- ${STORE_EMAIL_PASS} -- `)
        state.email = payload.email
        state.password = payload.password
        console.log("__state_", state)
        return state
    }
    case STORE_PROFILE: {
        /***
         data.userProfile {
            name,
            email,
            phoneNumber,
            ...
        }
        **/
       const user = payload.data
       state.id = user.id
       state.name = user.name
       state.email = user.email
       state.phoneNumber = user.phoneNumber
       return state
    }
    default:
        return state
  }
}

export default reducer

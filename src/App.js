import './App.css'
import SignIn from "./components/SignIn"
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from "./components/SignUp"
import { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./route/privateRoute"
import UserDashboard from "./components/UserDashboard"
import LoadingOverlay from "./components/LoadingOverlay";
import Toasts from "./components/Toasts"
/*
import faker from "faker"
*/

function App() {
  const [isGlobalLoading
    // ,setIsGlobalLoading
  ] = useState(false)

  const [toasts,setToasts] = useState({
    signUpSuccess: false,
    other: false
  })

  return (
 
    <main className="main-world" >
      <Router>
        <Switch>
          <Route exact path="/" >
            <SignIn isLogin={sessionStorage.getItem('isLogin')} />
          </Route>
          <Route path="/sign-up">
            <SignUp toasts={toasts} setToasts={setToasts} />
          </Route>
          <PrivateRoute component={UserDashboard} path="/dashboard" />
        </Switch>
      </Router>
      
      <Toasts toasts={toasts} setToasts={setToasts} />
      {isGlobalLoading && <LoadingOverlay type="cylon" color="#ffffff" /> }
    </main >
  )
}

export default App;

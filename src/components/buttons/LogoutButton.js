import React from 'react'
import Btx from "./Button"

function LogoutButton() {
    const logout = () => {
        return new Promise ((resolve, reject) => {
            // sessionStorage.setItem('authToken', '')
            // sessionStorage.setItem("isLogin", '')
            // sessionStorage.removeItem('authToken')
            sessionStorage.clear()
            resolve(true)
        }).then((isClear) =>{
                console.log("kick me pls")
                if(isClear) {
                    window.location.reload()
                    return false
                }
                else console.log('isClear: ',isClear)
            }).catch((error)=>{
                console.log(error)
            })
    }
    return (
        <Btx onClick={() => { logout() }} >
            <div>Log Out</div>
        </Btx>
    )
}

export default LogoutButton

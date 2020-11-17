import React,{ useEffect } from 'react'
import { Container } from "react-bootstrap"
import LogoutButton from "./buttons/LogoutButton"

// import { useHistory } from "react-router-dom"
function UserDashboard({userProfile,setUserProfile}) {

    useEffect(() => {
        console.log("userProfile ",userProfile)
    }, [userProfile])

    return (
        <Container className="my-4">
            <h3>USER DASHBOARD</h3>
            <p>Id: {userProfile.id}</p>
            <p>Name: {userProfile.name}</p>
            <p>Email: {userProfile.email}</p>
            <p>Phone Number: {userProfile.phoneNumber}</p>
            <LogoutButton />

        </Container>
    )
}

export default UserDashboard

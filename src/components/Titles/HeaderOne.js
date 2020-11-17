import React from 'react'
import {
    Row,
    Col,
   } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

function HeaderOne({text = 'One Mango Luv'}) {

    //     <Row>
    //       <Col lg={12} className="border-check-off text-center mx-3 my-4" >
    // <h4 className="text-mango font-weight-bolder title-1" >{text}</h4>
    //       </Col>
    //     </Row>
    const history = useHistory()
    function clickHandler()
    {
        //redirect to home/signin
        history.push("/")
    }
    return (
        <Row>
            <Col lg={12} className="border-check-off text-center mx-3 my-4" style={{cursor:"pointer"}} >
                <h4 className="text-mango font-weight-bolder title-1" onClick={() => clickHandler()} >{text}</h4>
            </Col>
        </Row>
    )
}

export default HeaderOne

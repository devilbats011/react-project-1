import React, {
    // useState,
} from 'react'
import {
    Row,
    Col,
    Toast,
    Container
} from "react-bootstrap";

function Toasts({toasts,setToasts}) {
    // const [show, setShow] = useState(true);
    return (
        <Row className="toast_main border-check-off mx-0 mb-4" >
            <Container>
            
            <Col xs={12}>
                <Toast show={toasts.signUpSuccess}  onClose={() => setToasts({...toasts,signUpSuccess: false})} delay={3500} autohide >
                    <Toast.Header>
                    <strong className="mr-auto text-success py-1 px-3">Register Success ! </strong>
                    <small>👍</small>
                    </Toast.Header>
                </Toast>
            </Col>
            </Container>
        </Row>
    )
}

export default Toasts

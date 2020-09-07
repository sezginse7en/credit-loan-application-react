import {Col,Row} from "react-bootstrap";
import React from "react";
import logo from './logo.png';

function CreditResult(_result,_limit,_message){
    return(
        <div>
            <Row className="header-banner">
                <Col sm={8} md={8} lg={8}>{<img src={logo}/>}</Col>
                <Col>Koç Finans Credit Loan System</Col>
            </Row>
            <hr/>
        </div>
    )
}

export default Header;
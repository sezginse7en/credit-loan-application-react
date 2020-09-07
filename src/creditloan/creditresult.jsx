import {Col,Row} from "react-bootstrap";
import React from "react";
import success_logo from '../logo/sucess.png';
import error_logo from '../logo/error.png';

function CreditResult(creditresult){
    const {result,limit,message} = creditresult.creditresult
    const logo = result === true ? success_logo : error_logo;
    return(
        <div className="credit-result">
            <img src={logo}/>
            <h1>{message}</h1>
            <h1>Credit Limit : {limit}</h1>
        </div>
    )
}

export default CreditResult;
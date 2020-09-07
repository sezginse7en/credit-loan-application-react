import React from 'react';
import {Form,Button,Container} from "react-bootstrap"
import * as axios from "axios";
import Header from "./header"
import CreditResult from "./creditresult";

class CreditLoan extends React.Component{

    state={isLoadCredit:false}

    async sendToCreditLoanService(){
        const {tcNumber,nameSurname,phoneNumber,monthlyIncoming} = this.state;
        let instance = axios.create({
            baseURL : "http://localhost:8080",
            method : "post",
            withCredentials:true,
            data:{
                user : {
                    tc : tcNumber,
                    name : nameSurname,
                    phoneNumber : phoneNumber,
                    monthlyIncoming :monthlyIncoming
                }
            },
            headers : {
                "content-type":'application/json',
                "accept" : 'application/json'
            },
            config:{}
        });
        let response = await Promise.all([instance.post("/creditloan",{
            user : {
                tc : tcNumber,
                    name : nameSurname,
                    phoneNumber : phoneNumber,
                    monthlyIncoming :monthlyIncoming
            }
        })]).then(
            (response) => {
                this.setState({creditResult : response[0].data.result,isLoadCredit:true});
            }
        ).catch((error) => {
            this.setState({isLoadCredit:true,creditResult:{result:false,message:"Credit Loan is unsuccessfull",limit:0}})
        });
        console.log(response);
    }

    tcNumberChange(e){
        this.setState({tcNumber:e.target.value})
    }

    nameSurnameChange(e){
        this.setState({nameSurname:e.target.value})
    }

    phoneNumberChange(e){
        this.setState({phoneNumber:e.target.value})
    }

    monthlyIncomingChange(e){
        this.setState({monthlyIncoming:e.target.value})
    }

    render(){

        const {creditResult,isLoadCredit} = this.state;

        const creditLoanForm = <div className="form-div">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>TC Number</Form.Label>
                <Form.Control type="number" placeholder="TC Number" value={this.state.tcNumber}
                              onChange={this.tcNumberChange.bind(this)}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name Surname</Form.Label>
                <Form.Control type="text" placeholder="Name Surname" value={this.state.nameSurname}
                              onChange={this.nameSurnameChange.bind(this)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Monthly Incoming</Form.Label>
                <Form.Control type="number" placeholder="Monthly Incoming" value={this.state.monthlyIncoming}
                              onChange={this.monthlyIncomingChange.bind(this)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Phone Number" value={this.state.phoneNumber}
                              onChange={this.phoneNumberChange.bind(this)} />
            </Form.Group>
            <Button style={{float:"right"}}variant="success" type="submit" onClick={()=>{this.sendToCreditLoanService()}}>
                Apply Credit
            </Button>
        </div>

        return(
            <Container>
            <Header/>
                {isLoadCredit ? <CreditResult creditresult = {creditResult}/> : creditLoanForm}
            </Container>
        );

    }


}

export default CreditLoan;
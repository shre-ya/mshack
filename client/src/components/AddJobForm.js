import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import HeaderRecruter from './HeaderRecruiter';
import './AddJobForm.css'


class AddJobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            jobTitle: '',
            jobExpiry: '',
            role: '',
            redirect: false,
            failureSnack: false,
            salary: '',
        };

        //In JavaScript, class methods are not bound by default. 
        //If you forget to bind this.myChangeHandler and pass it to onChange, this will be undefined when the function is actually called.
        //But it works as the syntax we are using namely "Public Class Field Syntax" allows class fields to correctly bind callbacks.

    }
    // This syntax ensures `this` is bound within myChangeHandler and submitHandler.
    // We are using the experimental public class fields syntax, We can use class fields to correctly bind callbacks
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const job = {
            companyName: this.state.companyName,
            jobTitle: this.state.jobTitle,
            jobExpiry: this.state.jobExpiry,
            role: this.state.role,
            salary: this.state.salary

        }
        console.log(job);
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/add_job`, job);
            this.setState({ redirect: true });
        }
        catch (error) {
            console.log(error);
            this.setState({
                failureSnack: true
            });
        }
    }
    handleCloseFailureSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            failureSnack: false
        });
    };
    render() {
        //button logic
        var x = this.state.companyName && this.state.role && this.state.jobTitle && this.state.salary;
        console.log(this.state.companyName, this.state.role, this.state.jobTitle, this.state.salary);
        let sumbitButton = x ? <input style={{ color: "#33b579", width: "6rem", height: "3rem", fontWeight: "900" }}
            type='submit' /> : <p style={{ color: "red" }}>fill the mandatory * fields first</p>;


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/" />;
        }


        return (
            <div className="addform">
                <HeaderRecruter />
                <div className="container">
                    <div className="addfo">
                        <div style={{ color: "grey", marginTop: '2rem' }}>
                            <span style={{ color: "grey", fontSize: "2rem", fontWeight: "500" }}>Add a Job</span>
                        </div>
                        <div style={{ overflow: "scroll" }} className="form">
                            <form onSubmit={this.submitHandler}>
                                <p style={{ color: "black" }}><b>Company Name* :</b></p>
                                <input
                                    type='text'
                                    name='companyName'
                                    onChange={this.myChangeHandler}
                                />
                                <p style={{ marginTop: "1rem", color: "black" }}><b>Role* :</b></p>
                                <p>
                                    <label>
                                        <input className="with-gap" type="radio"
                                            name='role' value="One Time"
                                            onChange={this.myChangeHandler}
                                        />
                                        <span>One Time</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                            <label>
                                        <input className="with-gap" type="radio"
                                            name='role' value="Regular"
                                            onChange={this.myChangeHandler}
                                        />
                                        <span>Regular</span>
                                    </label>&nbsp;&nbsp;&nbsp;
                                </p>
                                <p style={{ marginTop: "1rem", color: "black" }}><b>Job Title:</b> (e.g. Carpenter, Electrician etc)</p>
                                <input
                                    type='text'
                                    name='jobTitle'
                                    onChange={this.myChangeHandler}
                                />
                                <p style={{ marginTop: "1rem", color: "black" }}><b>Expected Salary :</b></p>
                                <input
                                    type='text'
                                    name='salary'
                                    onChange={this.myChangeHandler}
                                />
                                <p style={{ marginTop: "1rem", color: "black" }}><b>Job Expiry Date (if known):</b></p>
                                <input
                                    type='date'
                                    name='jobExpiry'
                                    onChange={this.myChangeHandler}
                                />
                                <div>
                                    {sumbitButton}
                                </div>
                                <Snackbar open={this.state.failureSnack} autoHideDuration={6000} onClose={this.handleCloseFailureSnack} >
                                    <Alert onClose={this.handleCloseFailureSnack} severity="error" elevation={6} variant="filled">
                                        Failed to add your job.
                                    </Alert>
                                </Snackbar>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddJobForm;
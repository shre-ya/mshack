import React, { Component } from 'react';
import HeaderSeeker from './HeaderSeeker';

class AppliedJobs extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <HeaderSeeker />
                <div style={{ marginLeft: "30rem" }}>
                    <div style={{ marginTop: "5rem" }}>
                        <p>Job Title: Carpenter</p>
                        <p>Role: Part time</p>
                        <p>Posted By: Aditi</p>
                        <p>Recruiter Contact: 87337636356</p>
                    </div>
                    <div style={{ marginTop: "5rem" }}>
                        <p>Job Title: Janitor</p>
                        <p>Role: Part time</p>
                        <p>Posted By: Aditi</p>
                        <p>Recruiter Contact: 87337636356</p>
                    </div>
                    <div style={{ marginTop: "5rem" }}>
                        <p>Job Title: Gardener</p>
                        <p>Role: Regular</p>
                        <p>Posted By: Aditi</p>
                        <p>Recruiter Contact: 87337636356</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default AppliedJobs;
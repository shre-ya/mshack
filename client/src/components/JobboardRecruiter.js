import React, { Component } from 'react';
import axios from 'axios';
import RecruiterCards from './RecruiterCards';
import './Jobboard.css';
import { TouchBallLoading } from 'react-loadingg';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import HeaderRecruter from './HeaderRecruiter';


class Jobboard extends Component {

    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.state = {
            jobs: [],
            floatButton: 0,
            isFetching: true
        }

        this.refJobs = React.createRef();
    }
    async componentDidMount() {
        this.fetchJobs();
    }

    async fetchJobs() {
        this.setState({ isFetching: true });
        var job = await axios({
            method: 'get',
            url: `${process.env.PUBLIC_URL}/api/page_job?page=${this.state.page}`,
        });

        const page_jobs = job.data;


        this.setState({
            jobs: page_jobs,
        })
        if (this.refJobs.current)
            this.refJobs.current.scrollTop = 0;
        this.setState({ isFetching: false });
    }
    render() {
        var JOBS = this.state.jobs;
        return (
            <div className="jobboard-parent">
                <HeaderRecruter />
                <div className="jobboard">
                    {
                        this.state.isFetching
                            ?
                            <div className="Loading"> <TouchBallLoading style={{ width: "10rem" }} speed={0} color={"#33b579"} size="large" /></div>
                            :
                            JOBS.length
                                ?
                                <div className="jobs" id="jobs" ref={this.refJobs}>
                                    <div>
                                        {
                                            JOBS.map(job => (
                                                //Adding key property here is segregating the the jobs being called and on changing the page calling the,
                                                //child's component again
                                                <RecruiterCards key={job.jobId} job={job} />
                                                // <Jobcard   />
                                            )
                                            )
                                        }
                                    </div>
                                </div>
                                :
                                <div style={{ position: "relative", marginLeft: "50%", left: "-8rem", top: "30%" }}>
                                    <h4 style={{ color: "grey" }}>No matching jobs to show!</h4>
                                    <div style={{ position: "relative", left: "7rem" }}>
                                        <SentimentVeryDissatisfiedIcon style={{ color: "grey" }} fontSize="large" />
                                    </div>
                                </div>
                    }
                </div>
            </div>
        )
    }
}
export default Jobboard;
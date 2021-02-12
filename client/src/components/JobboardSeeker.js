import React, { Component } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import './Jobboard.css';
import Sortingfilters from './SortingFilters';
import { TouchBallLoading } from 'react-loadingg';
import HeaderSeeker from './HeaderSeeker';
import SeekerCards from './SeekerCards';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
class Jobboard extends Component {

    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.state = {
            jobs: [],
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
        this.setState({ isFetching: false });
    }
    render() {
        var JOBS = this.state.jobs;
        return (
            <div className="jobboard-parent">
                <HeaderSeeker />
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
                                                <SeekerCards key={job.jobId} job={job} />
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
                <div className="filterboard">
                    <Box
                        boxShadow={1}
                        bgcolor="background.paper"
                        m={1}
                        p={1}
                        style={{ margin: "1rem 7rem 8rem 0rem", borderRadius: "5px", padding: "0", backgroundColor: "white" }}
                    >
                        <div className={this.state.sortingClass}>
                            <Sortingfilters companylist={this.state.listofcompanies} filterHandler={this.filterHandler} />
                        </div>
                    </Box>
                </div>
            </div>
        )
    }
}
export default Jobboard;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import JobcardDelete from './JobcardDeleteModal';
import Applicants from './ApplicantsModal';
import Box from '@material-ui/core/Box'
import { StylesProvider } from "@material-ui/core/styles";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Jobcard.css'
import moment from 'moment';
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


class Jobcard extends Component {
    constructor(props) {
        super(props);
        var hc = 0, h = false;
        this.person = this.props.auth.googleId;
        if (this.props.job.likers.length) {
            hc = this.props.job.likers.length;
            h = this.props.job.likers.includes(this.person);
        }
        this.state = {
            showDelete: false,
            showCard: true,
            heart: h,
            heartCount: hc,
            isLikeProcessing: false,
            // If using props to assign state it should be preferably done in the renderer only
            failureSnackOpen: false
        };
    }
    componentDidMount() {
    }
    deleteJobHandler = async () => {
        try {
            await this.setState({
                showCard: false
            });
            var del_link = `${process.env.PUBLIC_URL}/api/delete_job/` + this.props.job.jobId;
            await axios.delete(del_link);
        }
        //handelling error
        catch (error) {
            await this.setState({
                showCard: true
            });
            await this.setState({
                failureSnackOpen: true
            });
            console.log(this.state.failureSnackOpen, "fail on error");
        }
    }

    //Like button Handlers
    heartClick = async () => {


        if (!this.state.isLikeProcessing) {
            await this.setState({
                isLikeProcessing: true
            })
            var body = { jobId: this.props.job.jobId };
            if (this.state.heart) {
                this.setState({
                    heart: !this.state.heart,
                    heartCount: this.state.heartCount - 1
                })
                await axios.post(`${process.env.PUBLIC_URL}/api/remove_liker`, body);
                await this.setState({
                    isLikeProcessing: false
                });
            }
            else {
                this.setState({
                    heart: !this.state.heart,
                    heartCount: this.state.heartCount + 1
                })
                await axios.post(`${process.env.PUBLIC_URL}/api/add_liker`, body);
                await this.setState({
                    isLikeProcessing: false
                });
            }
        }
    }
    getHeart = () => {
        if (this.state.heart)
            return <FavoriteIcon fontSize="large" onClick={this.heartClick} style={{ cursor: "pointer", color: "rgb(253, 91, 91)" }} />
        return <FavoriteBorderIcon fontSize="large" onClick={this.heartClick} style={{ cursor: "pointer" }} />
    }

    //used to take only first 3 words from name
    getPostedbyName = (name) => {
        var r1 = name.split(" ");
        var res = '';
        if (r1.length > 0) {
            res = r1[0];
        }
        if (r1.length > 1) {
            res = res + ' ' + r1[1];
        }
        if (r1.length > 2) {
            res = res + ' ' + r1[2];
        }
        return res;
    }
    //closing failuresnack..
    handleClose = async () => {
        await this.setState({
            failureSnackOpen: false
        });
    }
    render() {
        const job = this.props.job;//this was previously accessed through state and constructor was not getting called again when the component's key attribute was not specified
        const auth = this.props.auth;
        var datePosted = moment(job.postedOn).format("DD-MM-YYYY HH:mm");

        //delete andCompanies (atmost 5) edit job link logic
        var del = null;
        if (auth._id && (auth._id === job.postedById)) {
            del = <JobcardDelete deleteJobHandler={this.deleteJobHandler} />;
        }
        //Comment Section Logic
        const date = new Date(job.jobExpiry);
        const default_date = new Date('1970,01,01');
        default_date.setHours(0, 0, 0, 0)
        const jobExpiry_date = new Date(job.jobExpiry);
        jobExpiry_date.setHours(0, 0, 0, 0);
        if (this.state.showCard) {
            return (
                <div>
                    <StylesProvider injectFirst>
                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            m={1}
                            p={1}
                        >
                            <div className="jobcard">
                                <div style={{ marginTop: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
                                    <div style={{ lineHeight: "100%" }}>
                                        <div style={{ lineHeight: "160%" }} className="jobcard-up">
                                            <p style={{ fontFamily: "Times New Roman", fontSize: "2rem", color: "rgb(90, 90, 90)" }} className="jobcard-up-line"><b>{job.companyName}</b></p>
                                        </div>
                                        <div style={{ float: "right", display: "flex" }} className="jobcard-up">
                                            <div className="jobcard-up-line">{del}</div>
                                        </div>
                                        <p style={{ fontSize: "0.8rem", color: "grey" }}>{datePosted}</p>
                                    </div>
                                    <hr style={{ borderTop: "1px solid #33b579", marginTop: "0.3rem", marginBottom: "0.6rem" }} />
                                    <div className="card-content" style={{ paddingLeft: "0.5rem" }}>
                                        <p style={{ display: "inline", color: "black" }}><span style={{ color: "grey" }}><b>Role:</b></span> {job.role}</p>
                                        <p style={{ display: "inline", color: "black" }}><span style={{ color: "grey" }}><b>&nbsp;&nbsp;&nbsp;&nbsp;Title:</b></span> {job.jobTitle}</p>
                                        <p style={{ marginTop: "0.5rem", color: "black" }}><span style={{ color: "grey" }}><b>Apply Before:</b>&nbsp;</span> {date.toLocaleDateString()}</p>
                                        <p style={{ marginTop: "0.5rem", color: "black" }}><span style={{ color: "grey" }}><b>Expected Salary:</b>&nbsp;</span> {job.salary ? job.salary : "NA"}</p>
                                    </div>
                                    <Applicants />
                                    <hr style={{ borderTop: "1px solid #33b579", marginTop: "0.6rem", marginBottom: "0.3rem" }} />
                                    <div className="cardlower">
                                        <div style={{ marginLeft: "1rem", display: "flex" }}>
                                            {this.getHeart()}
                                            <p style={{ color: "black" }}>&nbsp;&nbsp;{this.state.heartCount}&nbsp;&nbsp;</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </StylesProvider>
                    <div>
                    </div>
                </div>

            )
        }
        else {
            return null;
        }
    }
};
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Jobcard);
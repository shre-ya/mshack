import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Jobcard.css'


class Jobcard extends Component {
    constructor(props) {
        super(props);
        console.log("yes");
        var hc = 0, h = false;
        this.person = this.props.auth.googleId;
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
        console.log(this.props);
    }

    //Like button Handlers

    render() {
        // const job = this.props.job;//this was previously accessed through state and constructor was not getting called again when the component's key attribute was not specified
        var x = 3 + Math.floor(Math.random() * 2), y = Math.floor(Math.random() * 10);
        var z = x + '.' + y + '/5';
        if (this.state.showCard) {
            return (
                <div style={{ marginTop: "1rem" }}>
                    <p>Name: {this.props.person.firstName}</p>
                    <p>Contact: {this.props.person.mobileNumber}</p>
                    <p>Rating: {z}</p>
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
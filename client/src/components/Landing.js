import React, { Component } from 'react';
import HeaderLanding from './HeaderLanding';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './Landing.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        }
    }
    clickHandler = (x) => {
        this.setState({
            active: x
        });
    }
    render() {
        if (this.state.active === 1)
            return <Redirect push
                to={{
                    pathname: "/recruiter",
                }} />;
        if (this.state.active === 2)
            return <Redirect push
                to={{
                    pathname: "/seeker",
                }} />
        if (this.state.active === 0)
            return (
                <div>
                    <HeaderLanding />
                    {
                        this.props.auth ?
                            <div className="toggle">
                                <div className="intro">I am a...</div>
                                <div className="buttons">
                                    <button onClick={() => this.clickHandler(1)} className="buttonH button1">Recruiter</button>
                                    <button onClick={() => this.clickHandler(2)} className="buttonH button2">Job seeker</button>
                                </div>
                            </div>
                            :
                            <h3>Please login</h3>
                    }
                </div>
            )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Landing);
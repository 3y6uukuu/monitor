import './index.css';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getState} from './selectors';

// const Heartbeat = () => {
class Heartbeat extends Component {
    render() {
        return (
            <div className="heartbeat">
                {{
                    jugular: (
                        <svg viewBox="35 0 130 56" preserveAspectRatio="none" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path id="jugular" stroke="#009db1" fill="none" strokeWidth="1" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" />
                        </svg>
                    ),
                    pulsar: (
                        <svg viewBox="35 0 130 56" preserveAspectRatio="none" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path stroke="#1e9b41" fill="none" strokeWidth=".5" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" />
                            <path id="pulsar" stroke="#009db1" fill="none" strokeWidth="1" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" />
                        </svg>
                    ),
                    flat: (
                        <svg viewBox="0 -80 130 56" preserveAspectRatio="none" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path stroke="#f1d6b0" fill="none" strokeWidth="1" strokeLinejoin="round" d="M0,90 L500,90" />
                            <path id="flat" style={{stroke: '#c30a28', fill: 'none',  strokeWidth: 1, strokeLinejoin: 'round'}} d="M0,90 L500,90" />
                        </svg>
                    )
                }[this.props.state]}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: getState(state)
});

export default connect(mapStateToProps)(Heartbeat);

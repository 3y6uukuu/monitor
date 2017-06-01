import {SERVICES_IDS} from '../../../../../../../config';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {getStartTime, getEndTime, getInterval, getWorkProgressState} from './selectors';
import {getPassword} from '../Customer/Login/selectors';
import {getDisabledStatus} from '../../Main/ServiceCheckersTable/ServiceChecker/selectors';

import {work, sleep} from '../../../actions';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {timer, timerTitle, timerCountdown} from './styles';

// TODO: Add PropTypes
class Timer extends Component {
    constructor(props) {
        super(props);

        this.countdownTimeout = null;
        this.timeToSleepTimeout = null;
    }

    componentWillUpdate(nextProps) {
        const {workInProgress, startTime, password, getCodeDisabled} = nextProps;

        if (workInProgress) {
            (!getCodeDisabled && password) && this.checkWorkingDayHours();
        } else {
            this.clearTimeouts();
            this.updateView({state: 'STOPPED', time: startTime});
        }
    }

    clearTimeouts() {
        clearTimeout(this.countdownTimeout);
        clearTimeout(this.timeToSleepTimeout);
    }

    checkWorkingDayHours() {
        const {startTime, endTime, interval} = this.props;
        const now = moment();
        const momentStartTime = moment(startTime, 'HH:mm');
        const momentEndTime = moment(endTime, 'HH:mm');

        if (now.isBetween(momentStartTime, momentEndTime)) {
            const {dispatch} = this.props;
            dispatch(work());

            this.countdown(interval);
        } else {
            this.timeToSleep();
        }
    }

    countdown(minutes) {
        clearTimeout(this.countdownTimeout);

        let seconds = 60;
        let mins = minutes;

        function tick() {
            const currentMinutes = mins - 1;

            seconds--;

            const formatTimer = (currentMinutes, seconds) => {
                const appendZero = value => (value < 10 ? '0' : '');

                // 00:00
                return appendZero(currentMinutes) + String(currentMinutes) + ':' + appendZero(seconds) + String(seconds);
            };

            const time = formatTimer(currentMinutes, seconds);

            this.updateView({state: 'WORK', time});

            if (seconds > 0) {
                this.countdownTimeout = setTimeout(tick.bind(this), 1000);
            } else {
                (mins > 1) ? this.countdown(mins - 1) : this.checkWorkingDayHours();
            }
        }

        tick.bind(this)();
    }

    static getMilliseconds(time) {
        const now = moment();
        const start = moment(time, 'HH:mm');
        const duration = moment.duration(moment(start).diff(now));
        const ms = duration.asMilliseconds();
        const DAY = 86400000; // 24 hours

        return (ms < 0) ? (DAY - Math.abs(ms)) : ms;
    }

    timeToSleep() {
        clearTimeout(this.timeToSleepTimeout);

        const {startTime} = this.props;

        this.updateView({state: 'STOPPED', time: startTime});
        this.props.dispatch(sleep());

        const ms = Timer.getMilliseconds(startTime);
        wait.bind(this, ms)().then(() => this.checkWorkingDayHours());

        function wait(startTime) {
            return new Promise(resolve => {
                this.timeToSleepTimeout = setTimeout(resolve, startTime);
            });
        }
    }

    updateView(viewState) {
        this.clock.textContent = viewState.time;
    }

    render() {
        const {startTime, workInProgress, password} = this.props;

        return (
            <Toolbar style={timer}>
                <ToolbarGroup>
                    <ToolbarTitle text={(workInProgress && password) ? 'Next check after:' : 'Next check at:'} style={timerTitle} />

                    <div ref={clock => {this.clock = clock;}} style={timerCountdown}>
                        {startTime}
                    </div>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({
    startTime: getStartTime(state),
    endTime: getEndTime(state),
    interval: getInterval(state),
    workInProgress: getWorkProgressState(state),
    password: getPassword(state),
    getCodeDisabled: getDisabledStatus(state, SERVICES_IDS.GET_CODE),
});

export default connect(mapStateToProps)(Timer)
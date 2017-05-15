import {TIMER} from '../../../../../../../config';
import {Map} from 'immutable';
import {WORK, SLEEP} from '../../../actions';

const initial = Map({
    timer: Map({
        startTime: TIMER.startTime,
        endTime: TIMER.endTime,
        interval: TIMER.interval,
        workInProgress: true,
    }),
});

const updateTimerState = (state, payload) => state.set('workInProgress', payload);

function timer(state = initial.get('timer'), {type}) {
    switch (type) {
        case WORK:
            return updateTimerState(state, true);

        case SLEEP:
            return updateTimerState(state, false);

        default:
            return state;
    }
}

export default timer;
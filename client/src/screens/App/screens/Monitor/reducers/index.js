import {combineReducers} from 'redux-immutable';
import auth from '../components/Auth/reducer';
import heartbeat from '../components/Header/Heartbeat/reducer';
import customer from '../components/Header/Customer/Login/reducer';
import timer from '../components/Header/Timer/reducer';
import servicesCheckers from '../components/Main/ServiceCheckersTable/ServiceChecker/reducer';

const rootReducer = combineReducers({auth, customer, heartbeat, timer, servicesCheckers});

export default rootReducer;

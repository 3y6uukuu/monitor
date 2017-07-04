import {combineReducers} from 'redux-immutable';
import auth from '../components/Auth/reducer';
import heartbeat from '../components/Header/Heartbeat/reducer';
import customer from '../components/Header/Customer/Login/reducer';
import timer from '../components/Header/Timer/reducer';
import servicesCheckers from '../components/Main/ServiceCheckersTable/ServiceChecker/reducer';
import requestsDialog from '../components/Main/ServiceCheckersTable/RequestsDialog/reducer';

export default combineReducers({auth, customer, heartbeat, timer, servicesCheckers, requestsDialog});

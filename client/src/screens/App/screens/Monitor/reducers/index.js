import {combineReducers} from 'redux-immutable';
import timer from '../components/Header/Timer/reducer';
import auth from '../components/Auth/reducer';
import customer from '../components/Header/Customer/Login/reducer';
import servicesCheckers from '../components/Main/ServiceCheckersTable/ServiceChecker/reducer';

const rootReducer = combineReducers({timer, auth, customer, servicesCheckers});

export default rootReducer;
import {fork} from 'redux-saga/effects';
import auth from '../components/Auth/saga';
import serviceChecker from '../components/Main/ServiceCheckersTable/ServiceChecker/saga';

export default function* rootSaga() {
    yield fork(auth);
    yield fork(serviceChecker);
}

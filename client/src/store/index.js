import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import history from './history';
import {reducer as formReducer} from 'redux-form/immutable';
import monitorReducer from '../screens/App/screens/Monitor/reducers';

import monitorSaga from '../screens/App/screens/Monitor/sagas';

function configureStore(initialState) {
    const routerHistoryMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const loggerMiddleware = createLogger({
        duration: true,
        collapsed: true,
        // stateTransformer: state => {
        //     const {monitor} = state;
        //
        //     if (Immutable.Iterable.isIterable(monitor)) {
        //         state.monitor = monitor.toJS();
        //     }
        //
        //     return state;
        // }
    });

    const store = createStore(
        combineReducers({
            router: routerReducer,
            form: formReducer,
            monitor: monitorReducer,
        }),
        {...initialState},
        composeWithDevTools(applyMiddleware(routerHistoryMiddleware, sagaMiddleware, loggerMiddleware))
    );

    sagaMiddleware.run(monitorSaga);

    return store;
}

export default configureStore;

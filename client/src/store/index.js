import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {persistStore, autoRehydrate} from 'redux-persist-immutable';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

import history from './history';
import {reducer as formReducer} from 'redux-form/immutable';
import monitorReducer from '../screens/App/screens/Monitor/reducers';

import monitorSaga from '../screens/App/screens/Monitor/sagas';
import {Iterable} from 'immutable';

function configureStore() {
    const routerHistoryMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const loggerMiddleware = createLogger({
        collapsed: true,
        diff: true,
        stateTransformer: state => (Iterable.isIterable(state) ? state.toJS() : state),
    });

    const store = createStore(
        combineReducers({
            // TODO:
            router: routerReducer,
            form: formReducer,
            monitor: monitorReducer,
        }),
        composeWithDevTools(
            applyMiddleware(routerHistoryMiddleware, sagaMiddleware, loggerMiddleware),
            autoRehydrate()
        )
    );

    sagaMiddleware.run(monitorSaga);

    persistStore(store, {whitelist: ['monitor']});

    return store;
}

export default configureStore;

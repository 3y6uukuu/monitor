import 'typeface-roboto';
import './screens/App/styles';

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import history from './store/history';

import {Provider} from 'react-redux';
import Routes from './config/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

//TODO: remove from window object
window.store = configureStore();

ReactDOM.render(
    <Provider store={window.store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <Routes history={history} />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

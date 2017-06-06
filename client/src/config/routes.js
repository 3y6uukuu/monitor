import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import {Route, Redirect} from 'react-router';
import App from '../screens/App';
import Monitor from '../screens/App/screens/Monitor';

const Routes = props => (
    <ConnectedRouter {...props}>
        <App>
            <Route exact path="/" component={Monitor} />
            <Redirect from="/*" to="/" />
        </App>
    </ConnectedRouter>
);

export default Routes;
import React from 'react';
import Customer from './Customer';
import Timer from './Timer';
// import Heartbeat from './Heartbeat';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import {toolbar} from './styles';

const Header = () =>
    <Paper zDepth={1}>
        <Toolbar style={toolbar}>
            <ToolbarGroup>
                <Customer />
            </ToolbarGroup>
            {/*<ToolbarGroup>*/}
                {/*<Heartbeat />*/}
            {/*</ToolbarGroup>*/}
            <ToolbarGroup>
                <Timer />
            </ToolbarGroup>
        </Toolbar>
    </Paper>;

export default Header;


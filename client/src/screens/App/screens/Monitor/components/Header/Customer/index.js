import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCountry, getUserId} from './Login/selectors';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';

class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drawerIsOpen: false
        };
    }

    handleToggle() {
        const {drawerIsOpen} = this.state;

        this.setState({
            drawerIsOpen: !drawerIsOpen,
        });
    }

    handleClose() {
        this.setState({
            drawerIsOpen: false,
        });
    }

    render() {
        const {country, userId} = this.props;
        const {drawerIsOpen} = this.state;
        const logInLabel = (country && userId) ? `${country} | ${userId}` : 'Enter User Data';

        return (
            <div>
                <RaisedButton label={logInLabel} onTouchTap={() => this.handleToggle()} />

                <Drawer docked={false} width={290} open={drawerIsOpen} onRequestChange={drawerIsOpen => this.setState({drawerIsOpen})}>
                    <Login onLogIn={() => this.handleClose()} />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    country: getCountry(state),
    userId: getUserId(state),
});

export default connect(mapStateToProps)(Customer);
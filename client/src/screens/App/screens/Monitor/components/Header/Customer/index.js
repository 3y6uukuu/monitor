import React from 'react';
import {connect} from 'react-redux';
import {getCountry, getUserId} from './Login/selectors';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';

class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        const {country, userId} = this.props;
        const logInLabel = (country && userId) ? `${country} | ${userId}` : 'Enter User Data';

        return (
            <div>
                <RaisedButton label={logInLabel} onTouchTap={this.handleToggle}/>

                <Drawer docked={false} width={290} open={this.state.open} onRequestChange={open => this.setState({open})}>
                    <Login onLogIn={() => this.handleClose()} />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    country: getCountry(state),
    userId: getUserId(state),
});

export default connect(mapStateToProps)(Customer);
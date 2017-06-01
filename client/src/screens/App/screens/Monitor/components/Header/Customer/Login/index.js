import {CUSTOMER} from '../../../../../../../../config';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logIn} from '../../../../actions';
import Form from './Form';

// TODO: Add PropTypes
class Login extends Component {
    sendData(values) {
        this.props.onLogIn();
        this.props.dispatch(logIn(values.toJS()));
    }

    handleSubmit(values) {
        this.sendData(values);
    }

    render() {
        return (
            <Form onSubmit={value => this.handleSubmit(value)} {...this.props} />
        );
    }
}

const mapStateToProps = () => ({
    initialValues: {
        country: CUSTOMER.DEFAULT_DATA[0].COUNTRY,
        userId: CUSTOMER.DEFAULT_DATA[0].USER_ID,
        password: CUSTOMER.DEFAULT_DATA[0].PASSWORD,
    }
});

export default connect(mapStateToProps)(Login);

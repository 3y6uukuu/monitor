import {CUSTOMER} from '../../../../../../../../../config';
import React, {Component} from 'react';
import {Field, reduxForm, change} from 'redux-form/immutable';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {login, loginButtons, loginReset} from './styles';

class Form extends Component {

    prefillCustomerData(value) {
        const {USER_ID, PASSWORD} = CUSTOMER.DEFAULT_DATA.filter(customer => customer.COUNTRY === value)[0];
        const {dispatch} = this.props;

        dispatch(change('login', 'userId', USER_ID));
        dispatch(change('login', 'password', PASSWORD));
    }

    renderSelectField({input, label, children}) {
       return <SelectField
            floatingLabelText={label}
            {...input}
            onChange={(event, index, value) => {
                input.onChange(value);

                this.prefillCustomerData(value);
            }}
            children={children}
        />
    }

    renderTextField({input, label}) {
        return <TextField
            floatingLabelText={label}
            {...input}
        />
    }

    render() {
        const {handleSubmit, pristine, submitting, reset} = this.props;

        return (
            <form style={login} onSubmit={handleSubmit}>
                <Field name="country" component={event => this.renderSelectField(event)} label="Country">
                    {CUSTOMER.DEFAULT_DATA.map(customer =>
                        <MenuItem key={customer.COUNTRY} value={customer.COUNTRY} primaryText={customer.COUNTRY} />
                    )}
                </Field>

                <Field name="userId" type="email" component={this.renderTextField} label="User ID" />

                <Field name="password" type="password" component={this.renderTextField} label="Password" />

                <div style={loginButtons}>
                    <RaisedButton type="submit" label="Start" disabled={submitting} />

                    <RaisedButton style={loginReset} type="button" label="Reset Form" disabled={pristine || submitting}  onTouchTap={reset} />
                </div>
            </form>
        );
    }
}

Form = reduxForm({
    form: 'login',
})(Form);

export default Form;
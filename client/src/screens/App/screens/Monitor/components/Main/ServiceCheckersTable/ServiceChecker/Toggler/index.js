import React, {Component} from 'react';
import {connect} from 'react-redux';
import {disableService} from '../../../../../actions';
import {getDisabledStatus} from '../selectors';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

// TODO: Add PropTypes
class Toggler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbarIsOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled !== this.props.disabled) {
            this.setState({
                snackbarIsOpen: true,
            });
        }
    }

    update() {
        const {dispatch, id} = this.props;

        dispatch(disableService({id}));
    }

    handleRequestClose() {
        this.setState({
            snackbarIsOpen: false,
        });
    }

    formatServiceTitle(id) {
        return id.split('@')[0].replace(new RegExp('_', 'g'), ' ');
    }

    render() {
        const {disabled, id} = this.props;
        const {snackbarIsOpen} = this.state;

        return (
            <div>
                <Toggle defaultToggled={true} toggled={!disabled} onToggle={() => this.update()} />

                <Snackbar
                    open={snackbarIsOpen}
                    message={`Service "${this.formatServiceTitle(id)}" will be ${disabled ? 'DISABLED' : 'ENABLED'} during next check`}
                    autoHideDuration={2000}
                    onRequestClose={() => this.handleRequestClose()}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    disabled: getDisabledStatus(state, props.id)
});

export default connect(mapStateToProps)(Toggler);

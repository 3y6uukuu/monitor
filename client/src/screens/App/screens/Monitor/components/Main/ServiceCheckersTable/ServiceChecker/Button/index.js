import {SERVICES_IDS} from '../../../../../../../../../config';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createAction} from 'redux-actions';
import {getStatus, getParams} from '../selectors';
import {getUserId, getPassword} from '../../../../Header/Customer/Login/selectors';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {modalContent as modalContentStyles} from './styles';

class Button extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        statuses: PropTypes.object.isRequired
    };

    static get defaultProps() {
        return {
            status: 'STOPPED',
            statuses: {
                PENDING: {
                    text: 'Pending…',
                    modifiers: {
                        disabled: true,
                    },
                },
                UP: {
                    text: 'Up & running',
                    modifiers: {
                        primary: true,
                    },
                },
                DOWN: {
                    text: 'Doesn\'t work',
                    modifiers: {
                        secondary: true,
                    },
                },
                STOPPED: {
                    text: 'Stopped',
                    modifiers: {},
                },
                DISABLED: {
                    text: 'Disabled',
                    modifiers: {
                        disabled: true,
                    },
                },
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };
    }

    update() {
        const {dispatch} = this.props;
        let {id} = this.props;

        id = (id === SERVICES_IDS.GET_TOKEN) ? SERVICES_IDS.GET_CODE : id;

        // TODO: look for a better place for userId & password validation
        if (id === SERVICES_IDS.GET_CODE) {
            const {userId, password} = this.props;

            if (userId && password) {
                const action = createAction(id);
                dispatch(action({id}));
            } else {
                this.setState({
                    modalIsOpen: true
                });
            }
        } else {
            const action = createAction(id);
            dispatch(action({id}));
        }
    }

    handleCloseModal() {
        this.setState({
            modalIsOpen: false
        });
    }
    render() {
        const {status, statuses} = this.props;
        const {modalIsOpen} = this.state;
        const {modifiers, text} = statuses[status];

        return (
            <div>
                <Dialog
                    actions={[<FlatButton key="OK" label="OK" onTouchTap={() => this.handleCloseModal()} />]}
                    modal={false}
                    open={modalIsOpen}
                    onRequestClose={() => this.handleCloseModal()}
                    contentStyle={modalContentStyles}
                >
                    Please, enter user data
                </Dialog>

                <RaisedButton {...modifiers} onTouchTap={() => this.update()} label={text} fullWidth={true} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    status: getStatus(state, props.id),
    props: getParams(state, props.id),
    userId: getUserId(state),
    password: getPassword(state),
});

export default connect(mapStateToProps)(Button);

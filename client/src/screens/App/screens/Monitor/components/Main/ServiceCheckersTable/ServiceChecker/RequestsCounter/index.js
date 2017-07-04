import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {openRequestsDialog} from '../../../../../actions';
import {getRequests} from '../selectors';
import {
    requestsCounter as requestsCounterStyles,
    failedRequests as failedRequestsStyles,
    totalRequests as totalRequestsStyles,
} from './styles';


class RequestsCounter extends Component {
    static propTypes = {
        requests: PropTypes.shape({
            failed: PropTypes.any.isRequired,
            total: PropTypes.any.isRequired,
        }).isRequired,
    };

    static get defaultProps() {
        return {
            requests: {
                failed: 0,
                total: 0,
            },
        }
    }

    handleClick(serviceId) {
        this.props.dispatch(openRequestsDialog({serviceId}));
    }

    shouldComponentUpdate(nextProps) {
        const {failed, total} = nextProps.requests;

        return !(failed === undefined || total === undefined);
    }

    render() {
        const {requests: {failed, total}, id} = this.props;

        return (
            <div style={requestsCounterStyles}>
                <span style={failedRequestsStyles} onClick={() => this.handleClick(id)} >{failed}</span>
                <span style={totalRequestsStyles}> / {total}</span>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    requests: getRequests(state, props.id),
});

export default connect(mapStateToProps)(RequestsCounter);
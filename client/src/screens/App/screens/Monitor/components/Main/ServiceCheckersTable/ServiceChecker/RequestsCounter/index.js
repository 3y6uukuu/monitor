import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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

    shouldComponentUpdate(nextProps) {
        const {failed, total} = nextProps.requests;

        return !(failed === undefined || total === undefined);
    }

    render() {
        const {requests: {failed, total}} = this.props;

        return (
            <div style={requestsCounterStyles}>
                <span style={failedRequestsStyles}>{failed}</span>
                <span style={totalRequestsStyles}> / {total}</span>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    requests: getRequests(state, props.id),
});

export default connect(mapStateToProps)(RequestsCounter);
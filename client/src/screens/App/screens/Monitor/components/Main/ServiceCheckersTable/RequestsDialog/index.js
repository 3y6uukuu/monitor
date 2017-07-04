import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SERVICES} from '../../../../../../../../config';
import {closeRequestsDialog} from '../../../../actions';
import {getIsOpen, getServiceId, getRequests} from './selectors';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {
    statusCodeColumn as statusCodeColumnStyles,
    messageColumn as messageColumnStyles,
    timestampColumn as timestampColumnStyles,
} from './styles';

class RequestsDialog extends Component {

    getTitleByServiceId(serviceId, services) {
        return serviceId ? services.find(service => service.id === serviceId).title : '';
    }

    handleClose() {
        this.props.dispatch(closeRequestsDialog());
    }

    render() {
        const actions = [
            <RaisedButton
                key="Close"
                label="Close"
                primary={true}
                onTouchTap={() => this.handleClose()}
            />
        ];

        const {isOpen, serviceId, requests} = this.props;
        const title = this.getTitleByServiceId(serviceId, SERVICES);

        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={isOpen}
                onRequestClose={() => this.handleClose()}
                autoScrollBodyContent={true}
            >
                <Table striped={true}>
                    <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
                        {
                            requests && requests.length
                                ? requests.map((service, index) =>
                                    <TableRow key={index}>
                                        <TableRowColumn style={statusCodeColumnStyles}>{service.statusCode}</TableRowColumn>
                                        <TableRowColumn style={messageColumnStyles}>{service.message}</TableRowColumn>
                                        <TableRowColumn style={timestampColumnStyles}>{String(moment(service.timestamp).format('HH:mm'))}</TableRowColumn>
                                    </TableRow>)
                                :   <TableRow>
                                        <TableRowColumn>No errors found</TableRowColumn>
                                    </TableRow>
                        }
                    </TableBody>
                </Table>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    isOpen: getIsOpen(state),
    serviceId: getServiceId(state),
    requests: getRequests(state)
});

export default connect(mapStateToProps)(RequestsDialog);

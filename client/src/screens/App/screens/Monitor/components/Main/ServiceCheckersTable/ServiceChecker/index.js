import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Toggler from './Toggler';
import Title from './Title';
import Button from './Button';
import RequestsCounter from './RequestsCounter';
import {togglerColumn, buttonColumn, requestsCounterColumn} from './styles';

const ServiceChecker = props =>
    <TableRow hoverable={true} style={{...props.style}}>
        <TableRowColumn style={togglerColumn}>
            <Toggler {...props} />
        </TableRowColumn>

        <TableRowColumn>
            <Title {...props} />
        </TableRowColumn>

        <TableRowColumn style={buttonColumn}>
            <Button {...props} />
        </TableRowColumn>

        <TableRowColumn style={requestsCounterColumn}>
            <RequestsCounter {...props} />
        </TableRowColumn>
    </TableRow>;

export default ServiceChecker;

import React from 'react';
import {SERVICES_IDS, SERVICES} from '../../../../../../../config';
import {Table, TableBody} from 'material-ui/Table';
import ServiceChecker from './ServiceChecker';
import {subService as subServiceStyles} from './styles';

const mainServices = [SERVICES_IDS.GET_CODE, SERVICES_IDS.GET_TOKEN, SERVICES_IDS.GET_FRESH_ACCESS_TOKEN];

const ServiceCheckersTable = () =>
    <Table>
        <TableBody>
            {SERVICES.map(service =>
                <ServiceChecker key={service.id} {...service} style={mainServices.includes(service.id) ? null : subServiceStyles} />
            )}
        </TableBody>
    </Table>;

export default ServiceCheckersTable;

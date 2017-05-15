import React from 'react';
import Paper from 'material-ui/Paper';
import ServiceCheckersTable from './ServiceCheckersTable';

const Main = () =>
    <main>
        <Paper zDepth={1}>
            <ServiceCheckersTable />
        </Paper>
    </main>;

export default Main;

const {SERVER} = require('./config');
const express = require('express');
const app = express();
const headers = require('./express/headers');
const bodyParser = require('body-parser');
const router = require('./express/router');

app.use(headers);
app.use(bodyParser.json());
app.use('/api', router);

app.listen(SERVER.PORT, () => {
    console.log(`Express is listening to ${SERVER.URL}:${SERVER.PORT}`);
});

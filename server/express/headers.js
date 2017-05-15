module.exports = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, GET');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
    response.header('Access-Control-Allow-Credentials', true);

    next();
};

function isUp(statusCode) {
    return (statusCode >= 200 && statusCode < 300);
}

function isDown(statusCode) {
    return !isUp(statusCode);
}

module.exports = {
    isUp,
    isDown
};
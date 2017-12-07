const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const readline = require('readline');
const {isUp, isDown} = require('./responseChecker');

class Logger {
    constructor(country) {
        if (!country) throw new Error(`country param: "${country}"`);

        this.logsDir = `./logs/${country}`;

        Logger.mkdirSyncRecursive(this.logsDir);

        this.winstonLogger = new (winston.Logger)({
            transports: [
                new winston.transports.Console({
                    json: true,
                    colorize: true,
                }),
                new winstonDailyRotateFile({
                    filename: `${this.logsDir}/.log`,
                    datePattern: 'yyyy-MM-dd',
                    prepend: true,
                    level: 'error',
                })
            ],
            exitOnError: false,
        });
    }

    static mkdirSyncRecursive(path) {
        try {
            const dirs = path.split('/');

            for (let i = 1; i <= dirs.length; i++) {
                const dir = dirs.slice(0, i).join('/');

                !fs.existsSync(dir) && fs.mkdirSync(dir);
            }
        } catch (error) {
            console.log(`mkdirSyncRecursive => ${error}`);
        }
    }

    readLine() {
        const today = new Date().toISOString().slice(0, 10);
        const logFile = `${this.logsDir}/${today}.log`;

        if (!fs.existsSync(logFile)) throw new Error(`Log file "${logFile}" doesn't exist`);

        return readline.createInterface({
            input: fs.createReadStream(logFile),
            terminal: false,
        });
    }

    /**
     * @param {String} service name
     * @param {Object} params
     * @param {Number} statusCode
     * @param {String} body
     * @returns {Promise}
     */
    write(service, params, statusCode, body) {
        return new Promise(resolve => {
            const message = isUp(statusCode) ? 'Successful request' : body;
            this.winstonLogger.error({service, params, statusCode, message}, () => resolve());
        });
    }

    /**
     * @param {String} serviceId
     * @returns {Promise}
     */
    getRequestsQuantity(serviceId) {
        return new Promise((resolve, reject) => {
            try {
                let failedRequests = 0;
                let totalRequests = 0;

                this.readLine()
                    .on('line', line => {
                        const parsedLine = JSON.parse(line);
                        const {service, statusCode} = parsedLine;

                        if (service === serviceId) {
                            if (isDown(statusCode)) failedRequests++;

                            totalRequests++;
                        }
                    })
                    .on('close', () => {
                        resolve({failedRequests, totalRequests});
                    });
            } catch (error) {
                console.log(`getRequestsQuantity => ${error}`);
                reject(error);
            }
        });
    }

    /**
     * @param {String} serviceId
     * @param {Object} options
     * @returns {Promise}
     */
    getRequests(serviceId, options) {
        return new Promise((resolve, reject) => {
            try {
                let requests = '';

                this.readLine()
                    .on('line', line => {
                        const parsedLine = JSON.parse(line);
                        const {service, statusCode} = parsedLine;

                        if (service === serviceId) {
                            const {successful, failed} = options;

                            switch (true) {
                                case successful:
                                    if (isUp(statusCode)) requests += (line + ',');

                                    break;

                                case failed:
                                    if (isDown(statusCode)) requests += (line + ',');

                                    break;

                                default:
                                    requests += (line + ',');
                            }
                        }
                    })
                    .on('close', () => {
                        requests = requests.slice(0, -1);

                        resolve(JSON.parse(`[${requests}]`));
                    });

            } catch (error) {
                console.log(`getRequests => ${error}`);
                reject(error);
            }
        });
    }
}

module.exports = Logger;

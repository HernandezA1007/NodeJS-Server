const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
// const fs = require('fs-extra');     // the extra module contains multiple functions like promises

const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');


const eventLogs = async (message, logName) => {
    const uuid = uuidv4();
    const dateTime = `${format(new Date(), 'MM-dd-yyyy\thh:mm:ss')}`;
    const logItem = `${dateTime} \t ${uuid} \t ${message} \n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "/middleware/logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }
        await fsPromises.appendFile(
            path.join(__dirname, "logs", logName),
            logItem
        );
        console.log(`[${dateTime}] ${logName}: ${message}`);
    }
    catch (error) {
        console.error(`[${dateTime}] ${logName}: ${err}`);
        // console.log(err);
    }
}

const logger = ((req, res, next) => {
    eventLogs(`${req.method} ${req.headers.origin} ${req.url}`, "eventLogs.txt");
    console.log(`${req.method} ${req.path}`);
    next();
});

module.exports = { eventLogs, logger };
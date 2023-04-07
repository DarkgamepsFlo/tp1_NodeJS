const winston = require("winston");

const loggerinfo = winston.createLogger({
    level: "info", // définissez le niveau de verbosité à "debug" pour afficher tous les messages
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),

    transports: [
        new winston.transports.File({ filename: "./log/info.log" }),
        new winston.transports.Console()
    ],
});

const loggerdebug = winston.createLogger({
    level: "debug", // définissez le niveau de verbosité à "debug" pour afficher tous les messages
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),

    transports: [
        new winston.transports.File({ filename: "./log/debug.log" }),
        new winston.transports.Console()
    ],
});

const loggerwarn = winston.createLogger({
    level: "warn", // définissez le niveau de verbosité à "debug" pour afficher tous les messages
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),

    transports: [
        new winston.transports.File({ filename: "./log/warn.log" }),
        new winston.transports.Console()
    ],
});

const loggererror = winston.createLogger({
    level: "error", // définissez le niveau de verbosité à "debug" pour afficher tous les messages
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.json(),
        winston.format.prettyPrint(),
        
    ),

    transports: [
        new winston.transports.File({ filename: "./log/error.log" }),
        new winston.transports.Console()
    ],
});

module.exports = {
    loggerinfo, 
    loggerdebug, 
    loggerwarn, 
    loggererror
};
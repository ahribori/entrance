import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as path from 'path';
import * as dateFns from 'date-fns';

interface ILogger {
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
}

const logFormat = winston.format.printf(info => {
  const { timestamp, level, message } = info;
  return `${new Date(timestamp).toLocaleString()} ${level}: ${message}`;
});

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(info => {
    const { timestamp, level, message, ...args } = info;
    const time = dateFns.format(timestamp, 'YYYY-MM-DD HH:mm:ss');
    return `${time} [${level}]: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
      }`;
  }),
);

const dailyRotateCombineTransport = new DailyRotateFile({
  level: 'info',
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  dirname: './log',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    logFormat,
  ),
});

const dailyRotateErrorTransport = new DailyRotateFile({
  level: 'error',
  filename: '%DATE%.error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  dirname: './log',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp(),
    logFormat,
  ),
});

const consoleTransport = new winston.transports.Console({
  format: alignedWithColorsAndTime,
});

const logger = winston.createLogger({
  transports: [
    dailyRotateCombineTransport,
    dailyRotateErrorTransport,
    consoleTransport,
  ],
});

const getLogger = (fileName: string): ILogger => {
  const baseName = path.basename(fileName);
  return {
    error: (message: string) => {
      logger.error(`(${baseName}) ${message}`);
    },
    warn: (message: string) => {
      logger.warn(`(${baseName}) ${message}`);
    },
    info: (message: string) => {
      logger.info(`(${baseName}) ${message}`);
    },
    debug: (message: string) => {
      logger.debug(`(${baseName}) ${message}`);
    },
  };
};

export { getLogger, ILogger };

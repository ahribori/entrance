import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as dateFns from 'date-fns';

const logFormat = winston.format.printf(info => {
  const { level, message } = info;
  return `${dateFns.format(
    new Date(),
    'YYYY-MM-DD HH:mm:ss',
  )} ${level}: ${message}`;
});

const alignedWithColorsAndTime = winston.format.combine(
  winston.format.splat(),
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(info => {
    const { timestamp, level, message } = info;
    const time = dateFns.format(timestamp, 'YYYY-MM-DD HH:mm:ss');
    return `${time} [${level}] ${message}`;
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

export const logger = winston.createLogger({
  transports: [
    dailyRotateCombineTransport,
    dailyRotateErrorTransport,
    consoleTransport,
  ],
});

logger.error = (item: any) =>
  logger.log({
    level: 'error',
    message: item instanceof Error ? item.stack : item,
  });

export default logger;

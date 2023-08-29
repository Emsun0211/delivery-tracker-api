import winston, {format, createLogger, transports} from "winston";

const {combine, printf, label, timestamp} = format

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const CATEGORY = 'Winston logger'

export const logger = winston.createLogger({
    level: "debug",
  format: combine(label({label: CATEGORY }), timestamp(), customFormat),
  transports: [new winston.transports.File({
    filename: "log/example"
  })]
})
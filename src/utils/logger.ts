import logger from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

const log = logger(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  stream
);

export default log;

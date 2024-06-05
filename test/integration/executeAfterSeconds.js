const { Logger } = require('../../src/Logger');

const executeAfterSeconds = (time, cb) => {
  setTimeout(cb, 5000);

  Logger.info(`Disconnecting in ${time} seconds.`);
  for (let i = 1; i < time; i++) {
    const remains = time - i;
    setTimeout(() => Logger.log(`Disconnecting in ${remains} ${remains > 1 ? 'seconds' : 'second'}.`), i * 1000);
  }
};

module.exports = executeAfterSeconds;

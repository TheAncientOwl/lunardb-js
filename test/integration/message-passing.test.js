const LunarDB = require('../../src/LunarDB');
const { Logger, LogLevel } = require('../../src/Logger');

const executeAfterSeconds = (time, cb) => {
  setTimeout(cb, 5000);

  Logger.info(`Disconnecting in ${time} seconds.`);
  for (let i = 1; i < time; i++) {
    const remains = time - i;
    setTimeout(() => Logger.log(`Disconnecting in ${remains} ${remains > 1 ? 'seconds' : 'second'}.`), i * 1000);
  }
};

const test = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);
  ldb.connect();

  const sendCb = () => {
    ldb.execQuery('Hello from LunarDB-JS!').afterQueryExec(result => {
      Logger.info(`Received query result: ${result}`);
    });

    ldb.deleteOnConnectionEstablished(sendCb);
  };

  ldb.addOnConnectionEstablished(sendCb);

  ldb.addOnConnectionEstablished(() => {
    executeAfterSeconds(5, () => ldb.disconnect());
  });
};

test();

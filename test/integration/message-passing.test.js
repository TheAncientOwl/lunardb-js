const LunarDB = require('../../src/LunarDB');
const { Logger, LogLevel } = require('../../src/Logger');
const executeAfterSeconds = require('./executeAfterSeconds');

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

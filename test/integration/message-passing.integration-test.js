import { Logger } from '../../src/Logger.js';
import LunarDB from '../../src/LunarDB.js';

const executeAfterSeconds = (time, cb) => {
  setTimeout(cb, 5000);

  Logger.info(`Disconnecting in ${time} seconds.`);
  for (let i = 1; i < time; i++) {
    const remains = time - i;
    setTimeout(() => Logger.log(`Disconnecting in ${remains} ${remains > 1 ? 'seconds' : 'second'}.`), i * 1000);
  }
};

const integrationTest = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);
  ldb.connect();

  const sendCb = () => {
    ldb.query('Hello from LunarDB-JS!').then(result => {
      Logger.info(`Received query result: ${result}`);
    });

    ldb.removeOnConnectListener(sendCb);
  };

  ldb.addOnConnectListener(sendCb);

  ldb.addOnConnectListener(() => {
    executeAfterSeconds(5, () => ldb.disconnect());
  });
};

integrationTest();

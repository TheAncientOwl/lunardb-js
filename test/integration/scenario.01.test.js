const LunarDB = require('../../src/LunarDB');
const { Logger, LogLevel } = require('../../src/Logger');
const executeAfterSeconds = require('./executeAfterSeconds');

const test = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const scenarioCallback = () => {
    ldb
      .execQuery('database drop DummyDB;')
      .then(result => {
        Logger.info(`[RESPONSE] Step 0. ${result}`);

        return ldb.execQuery('database create DummyDB;');
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 1. ${result}`);

        return ldb.execQuery('database use DummyDB;');
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 2. ${result}`);

        return ldb.execQuery('schema Employee { name: String; salary: float; };');
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 3. ${result}`);

        return ldb.execQuery('create collection Employees based on Employee;');
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 4. ${result}`);

        return ldb.execQuery(
          'insert into Employees objects [ {"name":"Bob","salary":"4000"}{"name":"George","salary":"4500"} ];'
        );
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 5. ${result}`);

        ldb.removeOnConnectListener(scenarioCallback);
        ldb.disconnect();
      })
      .catch(err => {
        Logger.error(`Server error: ${err}`);
      });

    ldb.removeOnConnectListener(scenarioCallback);
  };

  ldb.addOnConnectListener(scenarioCallback);
};

test();

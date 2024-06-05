const LunarDB = require('../../src/LunarDB');
const { Logger, LogLevel } = require('../../src/Logger');
const executeAfterSeconds = require('./executeAfterSeconds');

const test = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const scenarioCallback = () => {
    ldb.execQuery('drop database DummyDB;').afterQueryExec(result => {
      Logger.info(`0. ${result}`);
      ldb.execQuery('database create DummyDB;').afterQueryExec(result => {
        Logger.info(`1. ${result}`);

        ldb.execQuery('use database DummyDB;').afterQueryExec(result => {
          Logger.info(`2. ${result}`);

          ldb.execQuery('schema Employee { name: String; salary: float; };').afterQueryExec(result => {
            Logger.info(`3. ${result}`);

            ldb.execQuery('create collection Employees based on Employee;').afterQueryExec(result => {
              Logger.info(`4. ${result}`);

              ldb
                .execQuery(
                  'insert into Employees objects [ {"name":"Bob","salary":"4000"}{"name":"George","salary":"4500"} ];'
                )
                .afterQueryExec(result => {
                  Logger.info(`5. ${result}`);
                  ldb.removeOnConnectListener(scenarioCallback);
                });
            });
          });
        });
      });
    });

    ldb.removeOnConnectListener(scenarioCallback);
  };

  ldb.addOnConnectListener(scenarioCallback);
};

test();

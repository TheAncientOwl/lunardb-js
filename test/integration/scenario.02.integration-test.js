const { LunarDB, QueryBuilders } = require('../../src/index');
const { Database, Schema, Create, Insert } = QueryBuilders;
const { Logger, LogLevel } = require('../../src/Logger');
const executeAfterSeconds = require('./executeAfterSeconds');

const integrationTest = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const databaseName = 'DummyDB';
  const schemaName = 'SomeSchema';
  const collectionName = 'SomeCollection';

  const scenarioCallback = () => {
    ldb
      .query(new Database().name(databaseName).isDrop())
      .then(result => {
        Logger.info(`[RESPONSE] Step 0. ${result}`);

        return ldb.query(new Database().name(databaseName).isCreate());
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 1. ${result}`);

        return ldb.query(new Database().name(databaseName).isUse());
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 2. ${result}`);

        return ldb.query(
          new Schema()
            .name(schemaName)
            .addField({ name: 'name', type: 'string' })
            .addField({ name: 'salary', type: 'float' })
        );
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 3. ${result}`);

        return ldb.query(new Create().name(collectionName).schema(schemaName).isDocument());
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 4. ${result}`);

        return ldb.query(
          new Insert()
            .into(collectionName)
            .addObject({ name: 'Bob', salary: 4000 })
            .addObject({ name: 'George', salary: 4500 })
            .addObject({ name: 'Akshan', salary: 1000000 })
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

integrationTest();

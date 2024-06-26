import { LunarDB, QueryBuilders } from '../../src/index.js';
import { Logger } from '../../src/Logger.js';

const { Database, Schema, Create, Insert, Select } = QueryBuilders;

const integrationTest = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const databaseName = 'ListsDB';
  const schemaName = 'List';
  const collectionName = 'Lists';

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

        return ldb.query(new Schema().name(schemaName).addField({ name: 'values', type: 'integer' }));
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
            .addObject({ values: [1, 2, 3, 4, 5] })
            .addObject({ values: [6, 7, 8, 9, 10] })
        );
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 5. ${result}`);

        return ldb.query(new Select().from(collectionName).addField('values').where('1 == 1'));
      })
      .then(result => {
        Logger.info(`[RESPONSE] Step 6. ${result}`);
        const { selection } = JSON.parse(result);
        Logger.info(`[RESPONSE] Step 6. Received ${selection.length} objects`);

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

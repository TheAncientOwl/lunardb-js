import { Logger } from '../../src/Logger.js';
import { LunarDB } from '../../src/index.js';

const integrationTest = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const databaseName = 'Scenario01_DB';
  const schemaName = 'Scenario01_Schema';
  const collectionName = 'Scenario01_Collection';

  const querries = [
    `database drop ${databaseName};`,
    `database create ${databaseName}`,
    `database use ${databaseName};`,
    `schema ${schemaName}  { name: String; salary: float; };`,
    `create collection ${collectionName}  based on ${schemaName} ;`,
    `insert into ${collectionName}  objects [ {"name":"Bob","salary":"4000"}{"name":"George","salary":"4500"}{"name":"Akshan","salary":"1000000"} ];`,
    `select from structure ${collectionName}  where ( 1 == 1 ) fields [ name, salary ];`,
    `update structure ${collectionName}  where ( name == Akshan ) modify [ salary => 2000000 ];`,
    `select from structure ${collectionName}  where ( 1 == 1 ) fields [ name, salary ];`,
  ];

  const scenarioCallback = async () => {
    ldb.removeOnConnectListener(scenarioCallback);

    try {
      for (const query of querries) {
        const result = await ldb.query(query);
        Logger.info(`[Response] ${result}`);
      }
    } catch (err) {
      Logger.error('err');
    }

    ldb.disconnect();
  };

  ldb.addOnConnectListener(scenarioCallback);
};

integrationTest();

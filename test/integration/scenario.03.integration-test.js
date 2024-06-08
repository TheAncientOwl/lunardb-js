import { LunarDB, QueryBuilders } from '../../src/index.js';
import { Logger } from '../../src/Logger.js';

const {
  Commit,
  Create,
  Database,
  Delete,
  Drop,
  Grant,
  Insert,
  Migrate,
  Rebind,
  Rename,
  Revoke,
  Rollback,
  SavePoint,
  Schema,
  Select,
  Truncate,
  Update,
  User,
} = QueryBuilders;

const integrationTest = () => {
  const ldb = new LunarDB('127.0.0.1', 8083);

  ldb.connect();

  const databaseName = 'Scenario03_DB';
  const schemaName = 'Scenario03_Schema';
  const collectionName = 'Scenario03_Collection';
  const username = 'SomeUser';

  const schemaDummy1 = `${schemaName}_dummy1`;
  const schemaDummy2 = `${schemaName}_dummy2`;

  const collectionDummy1 = `${collectionName}_dummy1`;
  const collectionDummy2 = `${collectionName}_dummy2`;

  const querries = [
    // <general>
    new Database().name(databaseName).isDrop(),
    new Database().name(databaseName).isCreate(),
    new Database().name(databaseName).isUse(),
    new Schema()
      .name(schemaName)
      .addField({ name: 'name', type: 'string' })
      .addField({ name: 'salary', type: 'float' }),
    new Drop().collection(collectionName),
    new Create().name(collectionName).schema(schemaName).isDocument(),
    //</general>

    // <insert>
    new Insert()
      .into(collectionName)
      .addObject({ name: 'Bob', salary: 4000 })
      .addObject({ name: 'George', salary: 4500 })
      .addObject({ name: 'Akshan', salary: 1000000 }),
    new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    //</insert>
  ];

  const scenarioCallback = async () => {
    ldb.removeOnConnectListener(scenarioCallback);

    try {
      for (const query of querries) {
        const result = await ldb.query(query);
        Logger.info(`[Response] ${result}`);
        Logger.verbose(''.padEnd(125, '-'));
      }

      for (let i = 0; i < 30000; i++) {
        const result = await ldb.query(
          new Insert()
            .into(collectionName)
            .addObject({ name: `SomeName${i.toString().padStart(4, '0')}`.padEnd(100, '01001010'), salary: 5000 })
        );
        Logger.info(`[Response] ${result}`);
        Logger.verbose(''.padEnd(125, '-'));
      }
    } catch (err) {
      Logger.error('err');
    }

    ldb.disconnect();
  };

  ldb.addOnConnectListener(scenarioCallback);
};

integrationTest();

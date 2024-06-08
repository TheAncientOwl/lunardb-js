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

  const databaseName = 'Scenario02_DB';
  const schemaName = 'Scenario02_Schema';
  const collectionName = 'Scenario02_Collection';
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

    // <rename>
    new Rename().isDatabase().from(databaseName).to(`${databaseName}_RENAME`),
    new Rename().isDatabase().from(`${databaseName}_RENAME`).to(databaseName),

    new Rename().isCollection().from(collectionName).to(`${collectionName}_RENAME`),
    new Rename().isCollection().from(`${collectionName}_RENAME`).to(collectionName),

    new Rename().isField().from(`${collectionName}::salary`).to(`${collectionName}::salary_RENAME`),
    new Rename().isField().from(`${collectionName}::salary_RENAME`).to(`${collectionName}::salary`),
    //</rename>

    // <rebind-migrate>
    new Schema().name(schemaDummy1).addField({ name: 'name', type: 'string' }),
    new Drop().collection(collectionDummy1),
    new Create().name(collectionDummy1).schema(schemaDummy1).isDocument(),

    new Schema()
      .name(schemaDummy2)
      .addField({ name: 'somefield', type: 'string' })
      .addField({ name: 'dummy1', type: 'dummy1' }),
    new Drop().collection(collectionDummy2),
    new Create().name(collectionDummy2).schema(schemaDummy2).isDocument(),

    new Rebind().current(`${collectionDummy2}::dummy1`).to(collectionDummy1),

    new Migrate().collection(collectionDummy2).toSchema(schemaDummy1).using({ actual: 'somefield', new: 'name' }),
    //</rebind-migrate>

    // <insert>
    new Insert()
      .into(collectionName)
      .addObject({ name: 'Bob', salary: 4000 })
      .addObject({ name: 'George', salary: 4500 })
      .addObject({ name: 'Akshan', salary: 1000000 }),
    new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    //</insert>

    // <update>
    new Update()
      .collection(collectionName)
      .where('name == Akshan')
      .addModify({ field: 'salary', expression: '2000000' }),
    new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    // </update>

    // <truncate>
    new Truncate().collection(collectionName),
    new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    // </truncate>

    // <user>
    'user remove PopescuIon;',
    new User().remove().username(username),
    new User().create().username(username).password('passwd'),
    new User().remove().username(username),
    new User().create().username(username).password('passwd'),
    new User().create().username(username).password('passwd'),
    new Grant()
      .toUser(username)
      .onCollection(collectionName)
      .permission('create')
      .permission('update')
      .permission('delete'),
    new Revoke()
      .fromUser(username)
      .onCollection(collectionName)
      .permission('create')
      .permission('update')
      .permission('delete'),
    // </user>

    // <commit>
    new Commit(),
    new SavePoint().hash('d4b2758da0205c1e0aa9512cd188002a'),
    new Rollback().hash('d4b2758da0205c1e0aa9512cd188002a'),
    // </commit>
  ];

  const scenarioCallback = async () => {
    ldb.removeOnConnectListener(scenarioCallback);

    try {
      for (const query of querries) {
        const result = await ldb.query(query);
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

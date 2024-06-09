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

  const querries = [
    // <database>
    new Database().name('FirmaDeCurieratBD').isDrop(),
    new Database().name('FirmaDeCurieratBD').isCreate(),
    new Database().name('FirmaDeCurieratBD').isUse(),
    // </database>

    // <schemas>
    new Schema()
      .name('Persoana_V0')
      .addField({ name: 'nume', type: 'String' })
      .addField({ name: 'prenume', type: 'String' })
      .addField({ name: 'nr_telefon', type: 'String' }),
    new Schema()
      .name('Persoana_V1')
      .inherits('Persoana_V0')
      .addField({ name: 'CNP', type: 'String' })
      .addField({ name: 'data_nastere', type: 'DateTime' })
      .addField({ name: 'email', type: 'String' }),
    new Schema()
      .name('Angajat')
      .inherits('Persoana_V1')
      .addField({ name: 'data_angajare', type: 'DateTime' })
      .addField({ name: 'salariu', type: 'Float' })
      .addField({ name: 'functie', type: 'String' }),
    new Schema().name('Client').inherits('Persoana_V1'),
    new Schema().name('PersoanaDeContact').inherits('Persoana_V0'),
    new Schema()
      .name('Adresa')
      .addField({ name: 'judet', type: 'String' })
      .addField({ name: 'oras', type: 'String' })
      .addField({ name: 'detalii', type: 'String' }),
    new Schema()
      .name('Colet')
      .addField({ name: 'curier', type: 'Angajat' })
      .addField({ name: 'client', type: 'Client' })
      .addField({ name: 'persoana_contact', type: 'PersoanaDeContact' })
      .addField({ name: 'adresa_livrare', type: 'Adresa' })
      .addField({ name: 'adresa_facturare', type: 'Adresa' })
      .addField({ name: 'greutate_grame', type: 'Integer' })
      .addField({ name: 'pret_expediere', type: 'Float' }),
    new Schema()
      .name('SedintaSuport')
      .addField({ name: 'operator', type: 'Angajat' })
      .addField({ name: 'client', type: 'Client' })
      .addField({ name: 'data', type: 'DateTime' })
      .addField({ name: 'descriere', type: 'String' }),
    // </schemas>

    // <collections>
    new Create().isDocument().name('Colete_NOSQL').schema('Colet'),
    new Create().isDocument().name('SedinteSuport_NOSQL').schema('SedintaSuport'),
    new Create().isTable().name('Angajati_SQL').schema('Angajat'),
    new Create().isTable().name('Clienti_SQL').schema('Client'),
    new Create().isTable().name('Adrese_SQL').schema('Adresa'),

    new Rebind().current('Colete_NOSQL::curier').to('Angajati_SQL').clean(false),
    new Rebind().current('Colete_NOSQL::client').to('Clienti_SQL').clean(false),
    new Rebind().current('Colete_NOSQL::adresa_livrare').to('Adrese_SQL').clean(false),
    new Rebind().current('Colete_NOSQL::adresa_facturare').to('Adrese_SQL').clean(false),
    new Rebind().current('SedinteSuport_NOSQL::operator').to('Angajati_SQL').clean(false),
    new Rebind().current('SedinteSuport_NOSQL::client').to('Clienti_SQL').clean(false),
    // </collections>

    // <insert>
    new Insert()
      .into('Angajati_SQL')
      .addObject({
        nume: 'Popescu',
        prenume: 'Ion',
        nr_telefon: '0745123456',
        CNP: '1900101123456',
        data_nastere: '1990-01-01',
        email: 'ion.popescu@email.com',
        data_angajare: '2015-06-15',
        salariu: '4500',
        functie: 'Curier',
      })
      .addObject({
        nume: 'Ionescu',
        prenume: 'Maria',
        nr_telefon: '0725123456',
        CNP: '2860202123456',
        data_nastere: '1986-02-02',
        email: 'maria.ionescu@email.com',
        data_angajare: '2018-09-01',
        salariu: '5100',
        functie: 'Operator',
      })
      .addObject({
        nume: 'Dumitrescu',
        prenume: 'Andrei',
        nr_telefon: '0733123456',
        CNP: '1800303123456',
        data_nastere: '1980-03-03',
        email: 'andrei.dumitrescu@email.com',
        data_angajare: '2012-03-10',
        salariu: '5000',
        functie: 'Curier',
      })
      .addObject({
        nume: 'Georgescu',
        prenume: 'Elena',
        nr_telefon: '0768123456',
        CNP: '2920404123456',
        data_nastere: '1992-04-04',
        email: 'elena.georgescu@email.com',
        data_angajare: '2020-01-20',
        salariu: '4600',
        functie: 'Operator',
      })
      .addObject({
        nume: 'Popa',
        prenume: 'Teodor',
        nr_telefon: '0756123456',
        CNP: '1880505123456',
        data_nastere: '1988-05-05',
        email: 'teodor.popa@email.com',
        data_angajare: '2017-11-05',
        salariu: '6000',
        functie: 'Curier',
      }),

    new Select()
      .from('Angajati_SQL')
      .addField('nume')
      .addField('prenume')
      .addField('data_nastere')
      .addField('data_angajare')
      .addField('salariu')
      .addField('functie')
      .where('1 == 1'),

    new Select()
      .from('Angajati_SQL')
      .addField('nume')
      .addField('prenume')
      .addField('data_nastere')
      .addField('data_angajare')
      .addField('salariu')
      .addField('functie')
      .where('functie == Curier and salariu >= 5000 and salariu <= 5500'),
    // </insert>

    // <delete>
    new Delete().from('Angajati_SQL').where('functie == Curier and salariu >= 5000 and salariu <= 5500'),

    new Select()
      .from('Angajati_SQL')
      .addField('nume')
      .addField('prenume')
      .addField('data_nastere')
      .addField('data_angajare')
      .addField('salariu')
      .addField('functie')
      .where('functie == Curier and salariu >= 5000 and salariu <= 5500'),

    new Select()
      .from('Angajati_SQL')
      .addField('nume')
      .addField('prenume')
      .addField('data_nastere')
      .addField('data_angajare')
      .addField('salariu')
      .addField('functie')
      .where('1 == 1'),
    // </delete>

    // <update>
    new Update()
      .collection('Angajati_SQL')
      .where('functie == Curier and salariu >= 2000 and salariu <= 5500')
      .addModify({ field: 'salariu', expression: 'salariu + salariu * 5 / 100' }),

    new Select()
      .from('Angajati_SQL')
      .addField('nume')
      .addField('prenume')
      .addField('data_nastere')
      .addField('data_angajare')
      .addField('salariu')
      .addField('functie')
      .where('1 == 1'),
    // </update>

    // <commit>
    new Commit(),
    // </commit>

    // // <insert>
    // new Insert()
    //   .into(collectionName)
    //   .addObject({ name: 'Bob', salary: 4000 })
    //   .addObject({ name: 'George', salary: 4500 })
    //   .addObject({ name: 'Akshan', salary: 1000000 }),
    // new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    // //</insert>

    // // <update>
    // new Update()
    //   .collection(collectionName)
    //   .where('name == Akshan')
    //   .addModify({ field: 'salary', expression: '2000000' }),
    // new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    // // </update>

    // // <truncate>
    // new Truncate().collection(collectionName),
    // new Select().from(collectionName).addField('salary').addField('name').where('1 == 1'),
    // // </truncate>

    // // <user>
    // 'user remove PopescuIon;',
    // new User().remove().username(username),
    // new User().create().username(username).password('passwd'),
    // new User().remove().username(username),
    // new User().create().username(username).password('passwd'),
    // new User().create().username(username).password('passwd'),
    // new Grant()
    //   .toUser(username)
    //   .onCollection(collectionName)
    //   .permission('create')
    //   .permission('update')
    //   .permission('delete'),
    // new Revoke()
    //   .fromUser(username)
    //   .onCollection(collectionName)
    //   .permission('create')
    //   .permission('update')
    //   .permission('delete'),
    // // </user>

    // // <commit>
    // new Commit(),
    // new SavePoint().hash('d4b2758da0205c1e0aa9512cd188002a'),
    // new Rollback().hash('d4b2758da0205c1e0aa9512cd188002a'),
    // // </commit>
  ];

  const scenarioCallback = async () => {
    Logger.info('<Scenario>');
    for (const query of querries) {
      Logger.log(query.build());
    }
    Logger.info('</Scenario>');

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

# 🌙 LunarDB-JS

LunarDB-JS is a JavaScript API designed as interface for LunarDB Server, a powerful C++ database management system.

This API allows seamless communication between Node.js backend servers and the LunarDB Server using WebSocket connections, facilitating robust and scalable database solutions for web applications and services.

For more informations on LunarDB C++ Server, visit https://github.com/TheAncientOwl/lunardb.

## ✨ Features

- **🔗 WebSocket Integration:** Leverages WebSocket connections for real-time communication with the LunarDB server.
- **🌟 Simple API:** Provides an easy-to-use interface for sending queries to the LunarDB server.
- **⚡ Asynchronous Operations:** Supports asynchronous operations for efficient handling of database queries.
- **📈 Scalability:** Designed to handle high volumes of database requests, making it suitable for large-scale applications.

## 📦 Installation

Install LunarDB-JS via [npm](https://www.npmjs.com/package/lunardb-js):

```sh
$ npm install lunardb-js
```

## 🚀 Usage

For more examples you can take a look at integration tests located at `./test/integration/*js`. Each one is a good example on how to send queries and use the results.

Also, you may want to take a look at _AstroHuddle_, an usage example of this API. The project can be found [here](https://github.com/TheAncientOwl/astro-huddle).

```javascript
import { LunarDB, QueryBuilders } from 'lunardb-js';

const ldb = new LunarDB('127.0.0.1', 8083);

ldb.addOnConnectListener(() => {
    const querries = [ ... ]; // see next section regarding queries

    try {
        for (const query of querries) {
            const server_result = await ldb.query(query);
            console.log(server_result);
        }
    } catch (err) {
        console.error(err);
    }
});

ldb.connect();
```

## 📚 Queries API

### Notes

- .build() generates a valid string that can be run by LunarDB server.
- When sending the query via LunarDB::query(...) calling .build() on the querry object is not necessary. The method is smart enough to call it on its own if it identifies a query object.
- More than that, if you don't want to use the QueryBuilder API, you can pass raw strings representing valid MoonlightQL queries. More details on Moonlight can be found [here](https://github.com/TheAncientOwl/lunardb/blob/main/Moonlight.md).

```javascript
new Database().isCreate().name('<database-name>').build();
new Database().isUse().name('<database-name>').build();
new Database().isDrop().name('<database-name>').build();
new Database().isBackup('path/to/backup/directory').name('<database-name>').build();

new User().create().username('<username>').password('<password>').build();
new User().remove().username('<username>').password('<password>').build();

new Grant()
    .toUser('<username>')
    .onCollection('<collection-name>')
    .permission('<permission01>')
    .permission('<permission02>')
    ...
    .permission('<permission-n>')
    .build();

new Revoke()
    .fromUser('<username>')
    .onCollection('<collection-name>')
    .permission('<permission01>')
    .permission('<permission02>')
    ...
    .permission('<permission-n>')
    .build();

new Schema()
    .name('<schema-name>')
    .inherits('<schema-name01>')
    .inherits('<schema-name02>')
    ...
    .inherits('<schema-name-n>')
    .addField({name: '<field-name01>', type: '<field-type01>'})
    .addField({name: '<field-name02>', type: '<field-type02>'})
    ...
    .addField({name: '<field-name-n>', type: '<field-type-n>'})
    .build();

new Create().isTable().name('<collection-name>').schema('<schema-name>').build();
new Create().isDocument().name('<collection-name>').schema('<schema-name>').build();

new Rebind()
    .current('<collection-name::field-name>')
    .to('<rebind-collection-name')
    .clean(true|false)
    .build();

new Drop()
    .collection('<collection-name>')
    .cascade(true|false)
    .build();

new Insert()
    .into('<collection-name>')
    .addObject({/* JavaScript object 01 */})
    .addObject({/* JavaScript object 02 */})
    ...
    .addObject({/* JavaScript object -n */})
    .build();

new Truncate().collection('<collection-name>').build();

new Select()
    .from('<collection-name>')
    .where('<where-clause>')
    .addField('field01')
    .addField('field02')
    ...
    .addField('field-n')
    .build();

new Delete()
    .from('<collection-name>')
    .where('<where-clause>')
    .build();

new Update()
    .structure('<collection-name>')
    .where('<where-clause>')
    .addModify({ field: '<field-name01>', expression: '<expression01>' })
    .addModify({ field: '<field-name02>', expression: '<expression02>' })
    ...
    .addModify({ field: '<field-name-n>', expression: '<expression-n>' })
    .build();

new Commit().build();
new SavePoint().hash('<hash>').build();
new Rollback().hash('<hash>').build();
```

## 📄 License

LunarDB-JS is licensed under the MIT License. See the [LICENSE](https://github.com/TheAncientOwl/lunardb-js/blob/main/LICENSE) file for more information.

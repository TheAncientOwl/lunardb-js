const Database = require('./Database');
const Schema = require('./Schema');
const Create = require('./Create');
const Insert = require('./Insert');
const Select = require('./Select');
const Update = require('./Update');

module.exports = { QueryBuilders: { Database, Schema, Create, Insert, Select, Update } };

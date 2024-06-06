const Database = require('./Database');
const Schema = require('./Schema');
const Create = require('./Create');
const Insert = require('./Insert');
const Select = require('./Select');

module.exports = { QueryBuilders: { Database, Schema, Create, Insert, Select } };

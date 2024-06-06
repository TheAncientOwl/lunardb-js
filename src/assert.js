const { Logger, LogLevel } = require('./Logger');

const assert = (condition, message) => {
  console.assert(condition, message);
  if (!condition) {
    throw new Error(message || Logger.format(LogLevel.Assert, 'Fail'));
  }
};

const assertNotEmpty = (value, label) => {
  assert(
    typeof value === 'string' && value.length != 0,
    Logger.format(LogLevel.Assert, `${label} cannot be empty string`)
  );
};

module.exports = { assert, assertNotEmpty };

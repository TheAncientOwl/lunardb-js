const assert = (condition, message) => {
  console.assert(condition, message);
  if (!condition) {
    throw new Error(message || '[LunarDB-JS] [ASSERT] Fail');
  }
};

module.exports = assert;

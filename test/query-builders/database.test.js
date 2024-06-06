const { QueryBuilders } = require('../../src/index');
const { Database } = QueryBuilders;

test('database', () => {
  const name = 'SomeDatabase';

  expect(new Database().isCreate().name(name).build()).toBe(`database create SomeDatabase ;`);
});

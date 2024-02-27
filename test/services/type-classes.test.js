const assert = require('assert');
const app = require('../../src/app');

describe('\'typeClasses\' service', () => {
  it('registered the service', () => {
    const service = app.service('type-classes');

    assert.ok(service, 'Registered the service');
  });
});

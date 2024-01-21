const assert = require('assert');
const app = require('../../src/app');

describe('\'cities\' service', () => {
  it('registered the service', () => {
    const service = app.service('cities');

    assert.ok(service, 'Registered the service');
  });
});

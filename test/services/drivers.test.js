const assert = require('assert');
const app = require('../../src/app');

describe('\'drivers\' service', () => {
  it('registered the service', () => {
    const service = app.service('drivers');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'reasons\' service', () => {
  it('registered the service', () => {
    const service = app.service('reasons');

    assert.ok(service, 'Registered the service');
  });
});

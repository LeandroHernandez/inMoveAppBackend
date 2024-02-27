const assert = require('assert');
const app = require('../../src/app');

describe('\'trips\' service', () => {
  it('registered the service', () => {
    const service = app.service('trips');

    assert.ok(service, 'Registered the service');
  });
});

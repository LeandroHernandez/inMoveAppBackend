const assert = require('assert');
const app = require('../../src/app');

describe('\'vehicle-images\' service', () => {
  it('registered the service', () => {
    const service = app.service('vehicle-images');

    assert.ok(service, 'Registered the service');
  });
});

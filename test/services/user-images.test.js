const assert = require('assert');
const app = require('../../src/app');

describe('\'user-images\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-images');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'example\' service', () => {
  it('registered the service', () => {
    const service = app.service('example');

    assert.ok(service, 'Registered the service');
  });
});

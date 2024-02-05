const assert = require('assert');
const app = require('../../src/app');

describe('\'userMessages\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-messages');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'exclusiveUsers\' service', () => {
  it('registered the service', () => {
    const service = app.service('exclusive-users');

    assert.ok(service, 'Registered the service');
  });
});

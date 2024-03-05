const assert = require('assert');
const app = require('../../src/app');

describe('\'getSteps\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-steps');

    assert.ok(service, 'Registered the service');
  });
});

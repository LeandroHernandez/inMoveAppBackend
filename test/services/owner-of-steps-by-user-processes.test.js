const assert = require('assert');
const app = require('../../src/app');

describe('\'ownerOfStepsByUserProcesses\' service', () => {
  it('registered the service', () => {
    const service = app.service('owner-of-steps-by-user-processes');

    assert.ok(service, 'Registered the service');
  });
});

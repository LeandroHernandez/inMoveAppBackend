const assert = require('assert');
const app = require('../../src/app');

describe('\'stepsPerUserProcess\' service', () => {
  it('registered the service', () => {
    const service = app.service('steps-per-user-process');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'stepsPerProcess\' service', () => {
  it('registered the service', () => {
    const service = app.service('steps-per-process');

    assert.ok(service, 'Registered the service');
  });
});

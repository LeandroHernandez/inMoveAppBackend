const assert = require('assert');
const app = require('../../src/app');

describe('\'otpStates\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-states');

    assert.ok(service, 'Registered the service');
  });
});

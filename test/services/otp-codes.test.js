const assert = require('assert');
const app = require('../../src/app');

describe('\'otpCodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-codes');

    assert.ok(service, 'Registered the service');
  });
});

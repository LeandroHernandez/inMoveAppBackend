const assert = require('assert');
const app = require('../../src/app');

describe('\'otpTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-types');

    assert.ok(service, 'Registered the service');
  });
});

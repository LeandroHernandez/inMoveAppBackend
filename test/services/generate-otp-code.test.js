const assert = require('assert');
const app = require('../../src/app');

describe('\'otp-code\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-code');

    assert.ok(service, 'Registered the service');
  });
});

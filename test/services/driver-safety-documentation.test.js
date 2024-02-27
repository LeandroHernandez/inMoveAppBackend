const assert = require('assert');
const app = require('../../src/app');

describe('\'DriverSafetyDocumentation\' service', () => {
  it('registered the service', () => {
    const service = app.service('driver-safety-documentation');

    assert.ok(service, 'Registered the service');
  });
});

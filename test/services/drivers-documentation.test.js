const assert = require('assert');
const app = require('../../src/app');

describe('\'driversDocumentation\' service', () => {
  it('registered the service', () => {
    const service = app.service('drivers-documentation');

    assert.ok(service, 'Registered the service');
  });
});

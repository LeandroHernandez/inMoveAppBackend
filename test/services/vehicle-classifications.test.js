const assert = require('assert');
const app = require('../../src/app');

describe('\'VehicleClassifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('vehicle-classifications');

    assert.ok(service, 'Registered the service');
  });
});

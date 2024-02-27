const assert = require('assert');
const app = require('../../src/app');

describe('\'tripSpecifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('trip-specifications');

    assert.ok(service, 'Registered the service');
  });
});

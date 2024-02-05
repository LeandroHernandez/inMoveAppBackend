const assert = require('assert');
const app = require('../../src/app');

describe('\'advertisingImages\' service', () => {
  it('registered the service', () => {
    const service = app.service('advertising-images');

    assert.ok(service, 'Registered the service');
  });
});

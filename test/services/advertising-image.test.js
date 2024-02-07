const assert = require('assert');
const app = require('../../src/app');

describe('\'advertising-image\' service', () => {
  it('registered the service', () => {
    const service = app.service('advertising-image');

    assert.ok(service, 'Registered the service');
  });
});

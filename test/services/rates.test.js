const assert = require('assert');
const app = require('../../src/app');

describe('\'rates\' service', () => {
  it('registered the service', () => {
    const service = app.service('rates');

    assert.ok(service, 'Registered the service');
  });
});

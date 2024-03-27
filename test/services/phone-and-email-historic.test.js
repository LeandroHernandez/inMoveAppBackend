const assert = require('assert');
const app = require('../../src/app');

describe('\'phoneAndEmailHistoric\' service', () => {
  it('registered the service', () => {
    const service = app.service('phone-and-email-historic');

    assert.ok(service, 'Registered the service');
  });
});

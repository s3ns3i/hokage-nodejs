const assert = require('assert');
const app = require('../../src/app');

describe('\'first-user\' service', () => {
  it('registered the service', () => {
    const service = app.service('first-user');

    assert.ok(service, 'Registered the service');
  });
});

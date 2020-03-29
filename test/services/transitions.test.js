const assert = require('assert');
const app = require('../../src/app');

describe('\'transition\' service', () => {
  it('registered the service', () => {
    const service = app.service('transition');

    assert.ok(service, 'Registered the service');
  });
});

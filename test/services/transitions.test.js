const assert = require('assert');
const app = require('../../src/app');

describe('\'transitions\' service', () => {
  it('registered the service', () => {
    const service = app.service('transitions');

    assert.ok(service, 'Registered the service');
  });
});

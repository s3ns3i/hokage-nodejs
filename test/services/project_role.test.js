const assert = require('assert');
const app = require('../../src/app');

describe('\'project_role\' service', () => {
  it('registered the service', () => {
    const service = app.service('project-role');

    assert.ok(service, 'Registered the service');
  });
});

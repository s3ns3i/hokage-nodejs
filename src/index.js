/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const hostname = app.get('host');
const port = app.get('port');

let server = null;
if(process.env.NODE_ENV) {
  const https = require('https');
  const fs = require('fs');
  const path = require('path');
  const socketio = require('@feathersjs/socketio');

  app.configure(socketio());

  server = https.createServer({
    key: fs.readFileSync(
      path.resolve(
        '../ssl/keys',
        '969cd_c3acb_e02d5936dbece98a4c9ebb23f6453167.key'
      )
    ),
    cert: fs.readFileSync(
      path.resolve(
        '../ssl/certs',
        'hokage_onepiecenakama_pl_969cd_c3acb_1607212799_0e3e7effb14cbe406076db0b710bba56.crt'
      )
    )
  }, app).listen(port, hostname);

  app.setup(server);

  server.on('listening', () =>
    logger.info('Feathers application started on https://%s:%d', hostname, port)
  );
} else {
  server = app.listen(port, hostname);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', hostname, port)
  );
}

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

process.on('uncaughtException', (error) => {
  logger.error(error);
});

#!/usr/bin/env node

const Logger = require('./utils/logger');
const NodeRtmpServer = require('./io/rtmp');
const NodeHttpServer = require('./io/http-flv');

const nrs = new NodeRtmpServer({
  chunk_size: 60000,
  gop_cache: true,
  ping: 30,
  ping_timeout: 60,
});
nrs.run();

const nhs = new NodeHttpServer();
nhs.run();

process.on('uncaughtException', function (err) {
  Logger.error('uncaughtException', err);
});

process.on('SIGINT', function () {
  process.exit();
});

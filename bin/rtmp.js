#!/usr/bin/env node

const Logger = require('../src/utils/logger');
const RtmpServer = require('../src/io/rtmp');
const HttpFlvServer = require('../src/io/http-flv');

const rtmp = new RtmpServer({
  chunk_size: 60000,
  gop_cache: true,
  ping: 30,
  ping_timeout: 60,
});
rtmp.run();

const httpFlv = new HttpFlvServer();
httpFlv.run();

process.on('uncaughtException', function (err) {
  Logger.error('uncaughtException', err);
});

process.on('SIGINT', function () {
  process.exit();
});

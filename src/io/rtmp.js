const net = require('net');
const RtmpSession = require('../session/rtmp');
const context = require('../context');
const Logger = require('../utils/logger');

class RtmpServer {
  constructor(config) {
    this.port = 1935;

    this.tcpServer = net.createServer((socket) => {
      const session = new RtmpSession(config, socket);
      session.run();
    });
  }

  run() {
    this.tcpServer.listen(this.port, () => {
      Logger.log(`Rtmp Server started on port: ${this.port}`);
    });

    this.tcpServer.on('error', (e) => {
      Logger.error(`Rtmp Server ${e}`);
    });

    this.tcpServer.on('close', () => {
      Logger.log('Rtmp Server Close.');
    });
  }

  stop() {
    this.tcpServer.close();

    context.sessions.forEach((session, id) => {
      if (session instanceof RtmpSession) {
        session.stop();
      }
    });
  }
}

module.exports = RtmpServer;

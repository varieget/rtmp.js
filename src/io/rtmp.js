const net = require('net');
const NodeRtmpSession = require('../session/rtmp');
const context = require('../core/context');
const Logger = require('../utils/logger');

class NodeRtmpServer {
  constructor(config) {
    this.port = 1935;

    this.tcpServer = net.createServer((socket) => {
      const session = new NodeRtmpSession(config, socket);
      session.run();
    });
  }

  run() {
    this.tcpServer.listen(this.port, () => {
      Logger.log(`Node Media Rtmp Server started on port: ${this.port}`);
    });

    this.tcpServer.on('error', (e) => {
      Logger.error(`Node Media Rtmp Server ${e}`);
    });

    this.tcpServer.on('close', () => {
      Logger.log('Node Media Rtmp Server Close.');
    });
  }

  stop() {
    this.tcpServer.close();

    context.sessions.forEach((session, id) => {
      if (session instanceof NodeRtmpSession) {
        session.stop();
      }
    });
  }
}

module.exports = NodeRtmpServer;

const http = require('http');
const NodeFlvSession = require('../session/flv');
const context = require('../core/context');
const Logger = require('../utils/logger');

class NodeHttpServer {
  constructor() {
    this.port = 8080;

    this.httpServer = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'range');

      if (req.method === 'OPTIONS') {
        res.statusCode(200);
      }

      const session = new NodeFlvSession(req, res);
      session.run();
    });
  }

  run() {
    this.httpServer.listen(this.port, () => {
      Logger.log(`Node Media Http Server started port: ${this.port}`);
    });

    this.httpServer.on('error', (e) => {
      Logger.error(`Node Media Http Server ${e}`);
    });

    this.httpServer.on('close', () => {
      Logger.log('Node Media Http Server Close.');
    });
  }

  stop() {
    this.httpServer.close();

    context.sessions.forEach((session, id) => {
      if (session instanceof NodeFlvSession) {
        session.req.destroy();
        context.sessions.delete(id);
      }
    });
  }
}

module.exports = NodeHttpServer;

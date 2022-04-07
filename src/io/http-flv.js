const http = require('http');
const HttpFlvSession = require('../session/http-flv');
const context = require('../context');
const Logger = require('../utils/logger');

class HttpFlvServer {
  constructor() {
    this.port = 8080;

    this.httpServer = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'range');

      if (req.method === 'OPTIONS') {
        res.statusCode(200);
      }

      const session = new HttpFlvSession(req, res);
      session.run();
    });
  }

  run() {
    this.httpServer.listen(this.port, () => {
      Logger.log(`Http Server started port: ${this.port}`);
    });

    this.httpServer.on('error', (e) => {
      Logger.error(`Http Server ${e}`);
    });

    this.httpServer.on('close', () => {
      Logger.log('Http Server Close.');
    });
  }

  stop() {
    this.httpServer.close();

    context.sessions.forEach((session, id) => {
      if (session instanceof HttpFlvSession) {
        session.req.destroy();
        context.sessions.delete(id);
      }
    });
  }
}

module.exports = HttpFlvServer;

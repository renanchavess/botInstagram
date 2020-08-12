const express = require('express');
const cors = require('cors');
const routesHome = require('./routes/homeRoutes');

require('./database');

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.configCors();
    this.routes();
  }

  routes() {
    this.server.use('/instagram', routesHome);
  }

  configCors() {
    this.server.use(cors(
      {
        origin: '*',
        optionsSuccessStatus: 200,
      },
    ));
  }
}

module.exports = new App().server;

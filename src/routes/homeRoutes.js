const { Router } = require('express');

const routes = new Router();

const HomeController = require('../app/controllers/HomeController');

routes.get('/listImages/:perfil', HomeController.listImages);
routes.post('/login', HomeController.Login);

module.exports = routes;

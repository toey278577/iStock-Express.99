module.exports = (app) => {
  const router = require('express').Router();
  const login = require("../../controllers/controllers_master_data/login.controller");

  router.post("/genkey", login.genkey);
  router.post('/login', login.login);
  router.post('/logout', login.isTokenBlacklisted, login.logout);
  
  app.use('/', router);
};
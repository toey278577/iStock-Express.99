module.exports =(app) => { // 2.9 receive_type ประเภทการรับ
  const router = require('express').Router()
  const{ getAllReceive_types, searchReceive_types } = require("../../controllers/controllers_master_data/receive_type.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllReceive_types);
  router.get("/search", ...authMiddleware,searchReceive_types);

  app.use("/receive_type",router)
}
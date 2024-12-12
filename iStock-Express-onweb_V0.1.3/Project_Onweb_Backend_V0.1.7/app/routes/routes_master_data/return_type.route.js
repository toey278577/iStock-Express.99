module.exports =(app) => { //2.11 return_type ประเภทการคืน
  const router = require('express').Router()
  const { getAllReturn_types, searchReturn_types } = require("../../controllers/controllers_master_data/return_type.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/',...authMiddleware,getAllReturn_types);
  router.get("/search",...authMiddleware,searchReturn_types);


  app.use("/return_type",router)
}
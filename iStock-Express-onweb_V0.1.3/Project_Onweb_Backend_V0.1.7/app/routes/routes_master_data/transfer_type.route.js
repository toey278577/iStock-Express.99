module.exports =(app) => { // 2.14 transfer_type ประเภทการโอนย้าย
  const router = require('express').Router()
  const  { getAllTransfer_types, searchTransfer_types } = require("../../controllers/controllers_master_data/transfer_type.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllTransfer_types);
  router.get("/search",...authMiddleware,searchTransfer_types);

  app.use("/transfer_type",router)
} 
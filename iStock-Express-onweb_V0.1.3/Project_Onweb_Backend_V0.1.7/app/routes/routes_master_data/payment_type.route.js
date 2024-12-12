module.exports =(app) => { // 2.10 payment_type ประเภทการจ่าย
  const router = require('express').Router()
  const { getAllPayment_types, searchPayment_types }= require("../../controllers/controllers_master_data/payment_type.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllPayment_types);
  router.get("/search",...authMiddleware,searchPayment_types);

  app.use("/payment_type",router)
}
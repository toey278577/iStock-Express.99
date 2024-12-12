module.exports =(app) => { // ชื่อยี่ห้อ
  const router = require('express').Router()
  const { getAllCustomers, searchCustomers } = require("../../controllers/controllers_master_data/customer.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  // เพิ่ม Middleware ที่ใช้ร่วมกัน
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllCustomers);
  router.get('/search', ...authMiddleware, searchCustomers);

  app.use("/customer",router)
}
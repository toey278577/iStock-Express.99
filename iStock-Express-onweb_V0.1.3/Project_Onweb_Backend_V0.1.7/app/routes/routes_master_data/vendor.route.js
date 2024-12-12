module.exports =(app) => { //2.5 seller ผู้จำหน่าย
  const router = require('express').Router()
  const  { getAllVendors, searchVendors }  = require("../../controllers/controllers_master_data/vendor.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");

  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllVendors);
  router.get("/search", ...authMiddleware,searchVendors);

  app.use("/vendor",router)
}
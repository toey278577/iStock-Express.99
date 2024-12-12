module.exports =(app) => { //2.7 storage_area ที่เก็บสินค้า
  const router = require('express').Router()
  const { getAllStorage_areas, searchStorage_areas } = require("../../controllers/controllers_master_data/storage_area.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllStorage_areas);
  router.get("/search",...authMiddleware,searchStorage_areas);

  app.use("/storage_area",router)
} 
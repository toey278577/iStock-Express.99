module.exports =(app) => { // 2.8 employee พนักงาน
  const router = require('express').Router()
  const  { getAllEmployees, searchEmployee } = require("../../controllers/controllers_master_data/employee.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllEmployees);
  router.get("/search", ...authMiddleware,searchEmployee);

  app.use("/employee",router)
}                   
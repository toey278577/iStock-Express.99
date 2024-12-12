module.exports =(app) => { // 2.12 problem_type ประเภทปัญหา
  const router = require('express').Router()
  const { getAllIssue_types, searchIssue_types } = require("../../controllers/controllers_master_data/issue_type.controller")
  const { verifyToken, isAdmin } = require('../../middleware/authJwt');
  const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
  
  const authMiddleware = [verifyToken, isTokenBlacklisted];

  router.get('/', ...authMiddleware,getAllIssue_types);
  router.get("/search",...authMiddleware,searchIssue_types);

  app.use("/issue_type",router)
}
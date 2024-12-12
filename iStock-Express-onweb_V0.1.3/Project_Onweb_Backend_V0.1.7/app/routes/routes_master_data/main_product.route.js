module.exports = (app) => {
    const { getAllMain_Product, searchMain_Product } = require("../../controllers/controllers_master_data/main_product.controller");
    const { verifyToken, isAdmin } = require('../../middleware/authJwt');
    const { isTokenBlacklisted } = require("../../controllers/controllers_master_data/login.controller");
    const router = require('express').Router();
    // เพิ่ม Middleware ที่ใช้ร่วมกัน
    const authMiddleware = [verifyToken, isTokenBlacklisted];

    router.get('/', ...authMiddleware, getAllMain_Product);
    router.get('/search', ...authMiddleware, searchMain_Product);

    // หากต้องการสิทธิ์ Admin ใช้ Middleware เพิ่มเติม
    //router.get('/', [...authMiddleware, isAdmin], getAllMain_Product);
    // router.get('/search', [...authMiddleware, isAdmin], searchMain_Product);

    app.use("/main_product", router);
};

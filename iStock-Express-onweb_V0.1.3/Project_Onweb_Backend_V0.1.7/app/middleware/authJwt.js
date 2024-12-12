const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const db = require('../models');
const { employee: Employee, access: Access } = db;

const blacklistedTokens = new Set();

const verifyToken = async (req, res, next) => {
    // ดึง token จาก Authorization header
    const token = req.headers['authorization']; 
    
    // ตรวจสอบว่ามี token หรือไม่ และตรวจสอบว่าเป็น Bearer token
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: "No token provided or incorrect token format" });
    }
    
    const actualToken = token.slice(7); // ลบ 'Bearer ' ออกเพื่อให้ได้ token

    // ตรวจสอบว่า token อยู่ใน blacklist หรือไม่
    if (blacklistedTokens.has(actualToken)) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }

    try {
        // ตรวจสอบและ decode token
        const decoded = jwt.verify(actualToken, config.secret);
        req.userId = decoded.id;

        const user = await Employee.findByPk(req.userId, {
            include: [{ model: Access, as: 'access', attributes: ['access_name'] }]
        });
        if (!user || !user.access) {
            return res.status(404).json({ message: "User not found or no access rights" });
        }

        req.userRole = user.access.access_name; // ดึง role (access_name) ของ user
        next();
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error: error.message });
    }
};

// Middleware สำหรับตรวจสอบสิทธิ์ admin
const isAdmin = (req, res, next) => req.userRole === 'admin' ? next() : res.status(403).json({ message: "Require Admin Role" });

// Middleware สำหรับตรวจสอบสิทธิ์ user
const isUser = (req, res, next) => req.userRole === 'user' ? next() : res.status(403).json({ message: "Require User Role" });

module.exports = { verifyToken, isAdmin, isUser };

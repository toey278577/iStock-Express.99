const db = require('../../models'); 
const config = require("../../config/auth.config");
const { employee: Employee, access: Access } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const blacklistedTokens = new Set();

exports.genkey = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  res.status(200).json({ password: hash });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

  Employee.findOne({
    where: { username },
    include: [{ model: Access, as: 'access', attributes: ['access_name'] }]
  })
  .then(user => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const accessName = user.access?.access_name; // ดึงค่า access_name จากการเชื่อมโยงกับ Access
    if (!accessName) return res.status(401).json({ message: "Access name not found" });
  
    const token = jwt.sign({ id: user.employee_ID, accessUser: accessName }, config.secret, { algorithm: "HS256", expiresIn: 3600 });
  
    res.status(200).json({
      id: user.employee_ID,
      username: user.username,
      firstname: user.firstname_employee,
      lastname: user.lastname_employee,
      accessUser: accessName, // ส่งค่า access_name ไปใน token
      accessToken: token
    });
  })
  .catch(() => res.status(500).json({ message: "Internal server error" }));
  
};

exports.logout = (req, res) => {
  const token = req.headers["authorization"]; // เปลี่ยนจาก x-access-token เป็น Authorization
  if (token && token.startsWith("Bearer ")) {
    const tokenValue = token.slice(7); // ดึง token ออกมา
    blacklistedTokens.add(tokenValue);  // เพิ่ม token ที่ logout ลงใน blacklistedTokens
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};

exports.isTokenBlacklisted = (req, res, next) => {
  const token = req.headers["authorization"]; // เปลี่ยนจาก x-access-token เป็น Authorization
  if (token && token.startsWith("Bearer ")) {
    const tokenValue = token.slice(7); // ดึง token ออกมา
    if (blacklistedTokens.has(tokenValue)) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
  }
  next();
};

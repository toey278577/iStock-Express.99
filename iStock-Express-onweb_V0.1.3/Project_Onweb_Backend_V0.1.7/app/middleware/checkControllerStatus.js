const checkControllerStatus = (controllerName, controllerGroup) => (req, res, next) => {
  const controllerConfig = require('../config/controllerConfig'); // โหลดใหม่
  delete require.cache[require.resolve('../config/controllerConfig')]; // ล้าง cache

  if (controllerConfig[controllerGroup][controllerName]) {
    next(); // เปิดใช้งาน
  } else {
    res.status(403).json({ message: `${controllerName} is currently disabled.` });
  }
};

module.exports = checkControllerStatus;

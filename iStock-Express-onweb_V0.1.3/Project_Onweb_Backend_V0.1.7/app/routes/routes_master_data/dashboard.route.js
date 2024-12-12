module.exports = (app) => {
  const router = require('express').Router();

  // เส้นทาง / ที่จะแสดงผลเป็น 'Dashboard Page'
   //app.get('/', (req, res) => {
   // res.send('Dashboard Page');
   //});

  // เส้นทาง /dashboard ที่จะใช้ router
  router.get('/', (req, res) => {
    res.send('Dashboard Page');
  });

  app.use('/dashboard', router);
};

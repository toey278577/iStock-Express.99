const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Connect Databases
const db = require('./app/models')
db.sequelize.sync({force:false}).then(() => { //force คือการ
    console.log('Database is connected')
})

// Routes
require('./app/routes/routes_master_data/login.route.js')(app); // หน้า login
require('./app/routes/routes_master_data/dashboard.route.js')(app); // หน้า dashboard

require('./app/routes/routes_list/receive.routes.js')(app);

require('./app/routes/routes_master_data/main_product.route.js')(app);
require('./app/routes/routes_master_data/vendor.route.js')(app); // 2.5 ผู้จัดจำหน่าย
require('./app/routes/routes_master_data/customer.route.js')(app); // 2.6 ลูกค้า
require('./app/routes/routes_master_data/storage_area.route.js')(app); // 2.7 ที่เก็บสินค้า
require('./app/routes/routes_master_data/employee.route.js')(app); // 2.8 พนักงาน
require('./app/routes/routes_master_data/receive_type.route.js')(app); // 2.9 ประเภทการรับ
require('./app/routes/routes_master_data/payment_type.route.js')(app); // 2.10 ประเภทการจ่าย
require('./app/routes/routes_master_data/return_type.route.js')(app); // 2.11 ประเภทการคืน
require('./app/routes/routes_master_data/issue_type.route.js')(app); // 2.12 ประเภทปัญหา
require('./app/routes/routes_master_data/transfer_type.route.js')(app); // 2.14 ประเภทการโอนย้าย
require('./app/routes/routes_master_data/booking_type.route.js')(app); // 2.15 ประเภทการจอง

// Start Server
app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT} link:: http://localhost:${PORT}/`);
});
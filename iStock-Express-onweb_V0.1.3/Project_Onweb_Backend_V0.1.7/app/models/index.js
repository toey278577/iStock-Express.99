const config = require("../config/db"); // นำเข้าการตั้งค่าฐานข้อมูล
const Sequelize = require("sequelize");

// การตั้งค่า Sequelize
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: config.port,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

// ตัวแปรสำหรับเก็บโมเดลทั้งหมด
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// โมเดลที่อยู่ใน models_master_data
db.access = require("./models_master_data/accessRight.model")(sequelize, Sequelize.DataTypes);
db.main_product = require("./models_master_data/main_product.model")(sequelize, Sequelize.DataTypes);
db.vendor = require("./models_master_data/vendor.model")(sequelize, Sequelize.DataTypes);
db.customer = require("./models_master_data/customer.model")(sequelize, Sequelize.DataTypes);
db.storage_area = require("./models_master_data/storage_area.model")(sequelize, Sequelize.DataTypes);
db.employee = require("./models_master_data/employee.model")(sequelize, Sequelize.DataTypes);
db.receive_type = require("./models_master_data/receive_type.model")(sequelize, Sequelize.DataTypes);
db.payment_type = require("./models_master_data/payment_type.model")(sequelize, Sequelize.DataTypes);
db.return_type = require("./models_master_data/return_type.model")(sequelize, Sequelize.DataTypes);
db.issue_type = require("./models_master_data/issue_type.model")(sequelize, Sequelize.DataTypes);
db.transfer_type = require("./models_master_data/transfer_type.model")(sequelize, Sequelize.DataTypes);
db.booking_type = require("./models_master_data/booking_type.model")(sequelize, Sequelize.DataTypes);

// โมเดลที่อยู่ใน models_list
db.receive = require("./models_list/receive.model")(sequelize, Sequelize.DataTypes);

// กำหนดความสัมพันธ์ระหว่างโมเดล
db.access.hasMany(db.employee, { foreignKey: 'accessRights', onDelete: 'CASCADE' });
db.employee.belongsTo(db.access, { foreignKey: 'accessRights',as: 'access' });

db.employee.hasMany(db.receive, { foreignKey: 'employeeId'});
db.receive.belongsTo(db.employee, { foreignKey: 'employeeId'});

db.receive.belongsTo(db.receive_type, { foreignKey: 'receiveTypeId'});
db.receive_type.hasMany(db.receive, { foreignKey: 'receiveTypeId' });

db.receive.belongsTo(db.vendor, { foreignKey: 'vendorId' });
db.vendor.hasMany(db.receive, { foreignKey: 'vendorId' });

db.receive.belongsTo(db.employee, { foreignKey: 'approvedById' });
db.employee.hasMany(db.receive, { foreignKey: 'approvedById' });

db.receive.belongsToMany(db.main_product, { foreignKey: 'receiveId', through: 'ReceiveMainProduct' });
db.main_product.belongsToMany(db.receive, { foreignKey: 'mainProductId', through: 'ReceiveMainProduct' });





module.exports = db;
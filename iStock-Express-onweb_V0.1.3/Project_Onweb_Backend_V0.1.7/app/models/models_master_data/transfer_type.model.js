module.exports = (sequelize, DataTypes) => {
    const transfer_type = sequelize.define("transfer_type", {
        transfer_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_transfer_type: { 
            type: DataTypes.STRING(50),
            allowNull: false
        }
    });
    return transfer_type;// 2.14 ประเภทการโอนย้าย
};

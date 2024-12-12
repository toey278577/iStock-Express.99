module.exports = (sequelize, DataTypes) => {
    const payment_type = sequelize.define("payment_type", {
        payment_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_payment_type: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        note_payment_type: { 
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
    return payment_type; //2.10 ประเภทการจ่าย
};

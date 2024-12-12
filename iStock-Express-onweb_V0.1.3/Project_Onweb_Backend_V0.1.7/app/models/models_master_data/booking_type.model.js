module.exports = (sequelize, DataTypes) => {
    const booking_type = sequelize.define("booking_type", {
        booking_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_booking_type: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        note_booking_type: { 
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
    return booking_type; // 2.15 ประเภทการจอง
};

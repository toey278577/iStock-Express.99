module.exports = (sequelize, DataTypes) => {
    const receive_type = sequelize.define("receive_type", {
        receive_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_receive_type: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        note_receive_type: { 
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
    return receive_type; //2.9 ประเภทการรับ
};

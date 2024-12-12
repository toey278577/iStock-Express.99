module.exports = (sequelize, DataTypes) => {
    const return_type = sequelize.define("return_type", {
        return_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_return_type: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        note_return_type: { 
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
    return return_type; //2.11 ประเภทการคืน
};

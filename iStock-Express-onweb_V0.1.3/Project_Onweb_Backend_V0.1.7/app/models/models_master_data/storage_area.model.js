module.exports = (sequelize, DataTypes) => {
    const storage_area = sequelize.define("storage_area", {
        storage_area_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        location_storage_area: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        use_storage_area: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
        
    });
    return storage_area; //2.7 ที่เก็บสินค้า
};

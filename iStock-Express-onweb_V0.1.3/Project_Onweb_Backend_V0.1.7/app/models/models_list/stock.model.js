module.exports = (sequelize, DataTypes) => {
    const stock = sequelize.define("stock", {
        Stock_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code_stock: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        name_stock: { 
            type: DataTypes.STRING(100),
            allowNull: false
        },
        brand_stock: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        group_stock: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        lot_dealer_stock: { 
            type: DataTypes.STRING(25), 
            allowNull: true
        },
        amount_serial: { 
            type: DataTypes.STRING(25), 
            allowNull: true
        },
        amount_stock: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        unit_product: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        storage_location: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        price: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 
        },
        MFG_Date: {  //Manufacture
            type: DataTypes.DATE,
            allowNull: true,
        },
        EXP_Date: {  //Expiry 
            type: DataTypes.DATE,
            allowNull: true,
        }
    });
    return stock;
};

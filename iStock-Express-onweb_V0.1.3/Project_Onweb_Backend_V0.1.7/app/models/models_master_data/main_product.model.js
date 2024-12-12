module.exports = (sequelize, DataTypes) => {
    const main_product = sequelize.define("main_product", {
        Product_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code_product: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        name_product: { 
            type: DataTypes.STRING(100),
            allowNull: false
        },
        brand_product: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        lot_dealer_product: { 
            type: DataTypes.STRING(25), 
            allowNull: true
        },
        amount_product: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        amount_serial: { 
            type: DataTypes.STRING(25), 
            allowNull: true
        },
        group_product: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        unit_product: { 
            type: DataTypes.STRING(25), 
            allowNull: false
        },
        buy_price: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 
        },
        sell_price: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 
        },
        storage_location: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        use_serial: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        use_lot: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        use_product: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
    return main_product;
};

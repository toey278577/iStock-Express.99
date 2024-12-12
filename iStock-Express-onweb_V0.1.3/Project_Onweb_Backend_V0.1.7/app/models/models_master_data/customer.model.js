module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define("customer", {
        customer_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code_customer: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        name_customer: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dealer_customer: { 
            type: DataTypes.STRING(25),
            allowNull: true
        },
        address_customer: { 
            type: DataTypes.STRING(25),
            allowNull: true
        },
        phone_customer: { 
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        note_customer: { 
            type: DataTypes.STRING(100),
            allowNull: true
        },
        use_customer: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
        
    });
    return customer; //2.6 ลูกค้า
};

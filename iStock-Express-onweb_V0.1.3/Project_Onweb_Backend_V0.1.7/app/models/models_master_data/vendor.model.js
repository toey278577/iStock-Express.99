module.exports = (sequelize, DataTypes) => {
    const vendor = sequelize.define("vendor", {
        vendor_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code_vendor: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        name_vendor: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dealer_vendor: { 
            type: DataTypes.STRING(25),
            allowNull: true
        },
        address_vendor: { 
            type: DataTypes.STRING(25),
            allowNull: true
        },
        phone_vendor: { 
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        note_vendor: { 
            type: DataTypes.STRING(100),
            allowNull: true
        },
        use_vendor: { 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }

    });
    return vendor; //2.5 ผู้จัดจำหน่าย
};
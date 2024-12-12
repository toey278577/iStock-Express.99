module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define("employee", {
        employee_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code_employee: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        username: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        firstname_employee: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname_employee: { 
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: { 
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone_employee: { 
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
                is: /^[0-9]+$/ // Only allows numbers
            }
        },
        accessRights: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        use_employee:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return employee; //2.8 พนักงาน
};

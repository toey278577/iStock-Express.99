module.exports = (sequelize, DataTypes) => {
    const receive = sequelize.define("receive", {
        receive_ID: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        document_No_receive: { 
            type: DataTypes.STRING(50),
            allowNull: false 
        },
        note_receive: { 
            type: DataTypes.STRING(255), 
            allowNull: true 
        },
        ref_No_receive: { 
            type: DataTypes.STRING(50), 
            allowNull: true  
        },
        delivery_No_receive: { 
            type: DataTypes.STRING(50), 
            allowNull: true 
        },
        create_receive_by: { 
            type: DataTypes.STRING(50),
            allowNull: true 
        },
        edit_receive_by: { 
            type: DataTypes.STRING(50), 
            allowNull: true 
        },
        status_receive: { 
            type: DataTypes.STRING(20), 
            allowNull: false 
        },
        date_receive: { 
            type: DataTypes.DATE, 
            allowNull: false 
        }
    });

    return receive;
};

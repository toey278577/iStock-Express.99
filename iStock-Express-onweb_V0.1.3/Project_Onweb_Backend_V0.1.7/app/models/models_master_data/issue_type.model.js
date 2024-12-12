module.exports = (sequelize, DataTypes) => {
    const issue_type = sequelize.define("issue_type", {
        issue_type_ID : { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name_issue_type: { 
            type: DataTypes.STRING(25),
            allowNull: false
        },
        note_issue_type: { 
            type: DataTypes.STRING(100),
            allowNull: true
        }
    });
    return issue_type; //2.12 ประเภทปัญหา
};
  
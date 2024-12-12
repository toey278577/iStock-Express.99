const db = require('../../models'); 
const Employee = db.employee 
const controllerConfig = require('../../config/controller.config');

exports.getAllEmployees = async (req, res) => {
    if (!controllerConfig.employee.getAll) return res.status(403).json({ message: "controller disable " });

    try {
        const Employees = await Employee.findAll();
        res.status(200).json(Employees);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchEmployee = async (req, res) => {
    if (!controllerConfig.employee.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['code_employee', 'username', 'firstname_employee', 'lastname_employee', 'phone_employee'];
        const whereConditions = fields.map(field => ({
            [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
        }));

        const employees = await Employee.findAll({
            where: {
                [db.Sequelize.Op.or]: whereConditions
            }
        });

        if (employees.length === 0) return res.status(404).json({ message: "No employees found" });

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error searching employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



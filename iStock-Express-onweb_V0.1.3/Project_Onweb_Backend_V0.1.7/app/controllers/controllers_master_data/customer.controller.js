const db = require('../../models');
const Customer = db.customer 
const controllerConfig = require('../../config/controller.config');

exports.getAllCustomers = async (req, res) => {
    if (!controllerConfig.customer.getAll) return res.status(403).json({ message: "controller disable " });

    try {
        const Customers = await Customer.findAll();
        res.status(200).json(Customers);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchCustomers = async (req, res) => {
    if (!controllerConfig.customer.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['code_customer', 'name_customer', 'dealer_customer', 'address_customer', 'phone_customer', 'note_customer'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Customer.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};


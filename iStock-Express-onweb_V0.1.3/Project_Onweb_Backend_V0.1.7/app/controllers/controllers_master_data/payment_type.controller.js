const db = require('../../models');
const Payment_type = db.payment_type 
const controllerConfig = require('../../config/controller.config');

exports.getAllPayment_types = async (req, res) => {
    if (!controllerConfig.payment_type.getAll) return res.status(403).json({ message: "controller disable" });

    try {
        const Payment_types = await Payment_type.findAll();
        res.status(200).json(Payment_types);
    } catch (error) {
        console.error("Error fetching Payment_type:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.searchPayment_types = async (req, res) => {
    if (!controllerConfig.payment_type.search) return res.status(403).json({ message: "controller disable" });
    
    const { keyword } = req.query;

    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['name_payment_type', 'note_payment_type'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Payment_type.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
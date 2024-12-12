const db = require('../../models');
const Vendor = db.vendor 
const controllerConfig = require('../../config/controller.config');

exports.getAllVendors = async (req, res) => {
    if (!controllerConfig.vendor.getAll) return res.status(403).json({ message: "controller disable" });

    try {
        const Vendors = await Vendor.findAll();
        res.status(200).json(Vendors);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchVendors = async (req, res) => {
    if (!controllerConfig.vendor.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['code_vendor','name_vendor','dealer_vendor','address_vendor','phone_vendor','note_vendor'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Vendor.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
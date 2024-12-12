const db = require('../../models');
const Storage_area = db.storage_area 
const controllerConfig = require('../../config/controller.config');

exports.getAllStorage_areas = async (req, res) => {
    if (!controllerConfig.storage_area.getAll) return res.status(403).json({ message: "controller disable" });

    try {
        const Storage_areas = await Storage_area.findAll();
        res.status(200).json(Storage_areas);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

exports.searchStorage_areas = async (req, res) => {
    if (!controllerConfig.storage_area.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['location_storage_area'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Storage_area.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
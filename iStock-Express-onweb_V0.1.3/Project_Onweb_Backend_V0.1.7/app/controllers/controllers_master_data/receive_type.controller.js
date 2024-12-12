const db = require('../../models');
const Receive_type = db.receive_type 
const controllerConfig = require('../../config/controller.config');

exports.getAllReceive_types = async (req, res) => {
    if (!controllerConfig.receive_type.getAll) return res.status(403).json({ message: "controller disable" });

    try {
        const Receive_types = await Receive_type.findAll();
        res.status(200).json(Receive_types);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchReceive_types = async (req, res) => {
    if (!controllerConfig.receive_type.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['name_receive_type', 'note_receive_type'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Receive_type.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
const db = require('../../models');
const Issue_type = db.issue_type 
const controllerConfig = require('../../config/controller.config');

exports.getAllIssue_types = async (req, res) => {
    if (!controllerConfig.issue_type.getAll) return res.status(403).json({ message: "controller disable " });

    try {
        const Issue_types = await Issue_type.findAll();
        res.status(200).json(Issue_types);
    } catch (error) {
        console.error("Error fetching Issue_type:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.searchIssue_types = async (req, res) => {
    if (!controllerConfig.issue_type.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['name_issue_type', 'note_issue_type'];
        const whereConditions = {
            [db.Sequelize.Op.or]: fields.map(field => ({
                [field]: { [db.Sequelize.Op.like]: `%${keyword}%` }
            }))
        };

        const data = await Issue_type.findAll({ where: whereConditions });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};
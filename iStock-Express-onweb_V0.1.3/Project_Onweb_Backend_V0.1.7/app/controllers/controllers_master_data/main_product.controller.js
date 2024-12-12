const db = require('../../models');
const Main_product = db.main_product;
const controllerConfig = require('../../config/controller.config');

exports.getAllMain_Product = async (req, res) => {
    if (!controllerConfig.main_product.getAll) return res.status(403).json({ message: "controller disable " });

    try {
        const main_Product = await Main_product.findAll();
        res.status(200).json(main_Product);
    } catch (error) {
        console.error("Error fetching Main_product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.searchMain_Product = async (req, res) => {
    if (!controllerConfig.main_product.search) return res.status(403).json({ message: "controller disable" });

    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ message: "Keyword is required" });

    try {
        const fields = ['code_product', 'name_product', 'brand', 'unit', 'storage_location'];
        const numFields = ['buy_price', 'sell_price', 'age'];
        const where = {
            [db.Sequelize.Op.or]: [
                ...fields.map(f => ({ [f]: { [db.Sequelize.Op.like]: `%${keyword}%` } })),
                ...numFields.map(f => db.Sequelize.where(
                    db.Sequelize.cast(db.Sequelize.col(f), 'VARCHAR'),
                    { [db.Sequelize.Op.like]: `%${keyword}%` }
                ))
            ]
        };

        const data = await Main_product.findAll({ where });
        res.status(data.length ? 200 : 404).json(data.length ? data : { message: "No data found" });
    } catch {
        res.status(500).json({ message: "Internal server error" });
    }
};




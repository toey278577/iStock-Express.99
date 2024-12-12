const db = require('../../models');
const Receive = db.receive
const Receive_type = db.receive_type
const Vendor = db.vendor
const Employee = db.employee
const Main_product = db.main_product

exports.getAllReceives = async (req, res) => {
    try {
        const receives = await Receive.findAll({
            attributes: [
                'document_No_receive',
                'note_receive',
                'ref_No_receive',
                'delivery_No_receive',
                'create_receive_by',
                'edit_receive_by',
                'status_receive',
                'date_receive',
            ],
            include: [
                {
                    model: Receive_type,
                    attributes: ["name_receive_type"]
                },
                {
                    model: Vendor,
                    attributes: ["code_vendor","name_vendor"]
                },
                {
                    model: Employee,
                    attributes: ["code_employee", "firstname_employee"]
                },
                {
                    model: Main_product,
                    attributes: ["code_product", "name_product", "lot_dealer_product", "amount_product", "amount_serial", "unit_product", "storage_location", "buy_price", "use_serial", "use_lot", "MFG_Date", "EXP_Date"]
                }
            ]
        });
        res.status(200).json(receives);
    } catch (error) {
        console.error("Error fetching receives:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

  // Assuming Employee and Receive are properly imported

  exports.createReceive = async (req, res) => {
    try {
        // รับค่าจาก request body
        const {
            document_No_receive,
            note_receive,
            ref_No_receive,
            delivery_No_receive,
            status_receive,
            date_receive,
            employeeId,
            receiveTypeId,
            vendorId,
            approvedById,
            mainProductIds // สมมติว่าได้รับข้อมูล main_product ที่เลือก
        } = req.body;

        // สมมติว่า req.user จะมีข้อมูลผู้ใช้ที่ทำการร้องขอ
        const user = req.user ? req.user.username : "Unknown"; // ใช้ค่า "Unknown" หากไม่พบผู้ใช้

        // ตรวจสอบว่า approvedById มีอยู่ในตาราง employees หรือไม่
        const approvedByEmployee = await Employee.findByPk(approvedById);
        if (!approvedByEmployee) {
            return res.status(400).json({ message: `Employee with ID ${approvedById} not found.` });
        }

        // สร้าง receive
        const newReceive = await Receive.create({
            document_No_receive,
            note_receive,
            ref_No_receive,
            delivery_No_receive,
            status_receive,
            date_receive,
            employeeId,          // เชื่อมโยงกับ employee
            receiveTypeId,       // เชื่อมโยงกับ receive_type
            vendorId,            // เชื่อมโยงกับ vendor
            approvedById,        // เชื่อมโยงกับ employee ที่อนุมัติ
            create_receive_by: user,   // กำหนดผู้ใช้ที่ทำการสร้าง
            edit_receive_by: user    // กำหนดผู้ใช้ที่ทำการแก้ไข
        });

        // เชื่อมโยงกับ main_product (หลายตัว)
        if (mainProductIds && mainProductIds.length > 0) {
            // ค้นหาข้อมูล main_products ที่มีอยู่ในฐานข้อมูล
            const mainProducts = await MainProduct.findAll({
                where: {
                    id: mainProductIds // ค้นหาตาม ID ที่ผู้ใช้เลือก
                }
            });

            // ตรวจสอบว่าผลิตภัณฑ์ที่เลือกมีอยู่ในระบบหรือไม่
            if (mainProducts.length !== mainProductIds.length) {
                return res.status(400).json({ message: "One or more selected main products not found." });
            }

            // เชื่อมโยง main products ที่ค้นหาได้กับ receive ใหม่
            await newReceive.addMainProduct(mainProducts);
        }

        res.status(201).json(newReceive);
    } catch (error) {
        console.error("Error creating receive:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





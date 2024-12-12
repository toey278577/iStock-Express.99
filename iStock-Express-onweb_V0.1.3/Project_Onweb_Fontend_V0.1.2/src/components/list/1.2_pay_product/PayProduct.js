import React, { useState } from "react";
import "./PayProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx"; // Import the xlsx library

function ReceiveProduct() {
  const [rows, setRows] = useState([
    {
      id: 1,
      col1: "เลขที่เอกสาร1",
      col2: "วันที่1",
      col3: "ประเภทการจ่าย1",
      col4: "เลขที่ใบส่งของ1",
      col5: "เลขที่อ้างอิง1",
      col6: "รหัสลูกค้า1",
      col7: "ชื่อลูกค้า1",
      col8: "ผู้จ่าย1",
      col9: "สถานะ1",
      col10: "หมายเหตุ1",
      col11: "สร้างโดย",
    },
  ]);

  const [newRow, setNewRow] = useState({
    col1: "",
    col2: "",
    col3: "",
    col4: "",
    col5: "",
    col6: "",
    col7: "",
    col8: "",
    col9: "",
    col10: "",
    col11: "",
  });

  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState(null); //เพิ่ม state เพื่อเก็บข้อมูลเฉพาะที่เเก้ไข
  const [searchTerm, setSearchTerm] = useState(""); // เพิ่ม state สำหรับช่องค้นหา
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // สำหรับแสดงการยืนยันลบ
  const [deleteId, setDeleteId] = useState(null); // เก็บ ID ที่จะลบ

  const columnNames = [
    { key: "col1", label: "เลขที่เอกสาร" },
    { key: "col2", label: "วันที่" },
    { key: "col3", label: "ประเภทการจ่าย" },
    { key: "col4", label: "เลขที่ใบจอง" },
    { key: "col5", label: "เลขที่อ้างอิง" },
    { key: "col6", label: "เเก้ไขโดย" },
    { key: "col7", label: "ชื่อลูกค้า" },
    { key: "col8", label: "ผู้เบิกสินค้า" },
    { key: "col9", label: "สถานะ" },
    { key: "col10", label: "หมายเหตุ" },
    { key: "col11", label: "สร้างโดย" },
  ];

  const deliverOptions = [
    "เลือกประเภทการจ่าย",
    "ขายสินค้า",
    "คืนสินค้า",
    "บริจาค",
    "ปรับยอดสต็อก",
    "โอนย้าย",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleInsert = () => {
    const newId = rows.length + 1;
    const newData = { id: newId, ...newRow };
    setRows([...rows, newData]);
    setNewRow({
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
      col6: "",
      col7: "",
      col8: "",
      col9: "",
      col10: "",
      col11: "",
    });
  };

  const handleDelete = (id) => {
    setShowDeleteConfirm(true);
    setDeleteId(id); // เก็บ ID ที่จะลบ
  };

  const confirmDelete = () => {
    const updatedRows = rows.filter((row) => row.id !== deleteId);
    setRows(updatedRows);
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleEdit = (id) => {
    setEditRowId(id); // เก็บ id ของแถวที่กำลังแก้ไข
    const rowToEdit = rows.find((row) => row.id === id); // ค้นหาแถวที่ต้องการ
    setNewRow({ ...rowToEdit }); // คัดลอกข้อมูลมาแก้ไข
  };

  const handleSaveEdit = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, ...newRow } : row
    );
    setRows(updatedRows);
    setEditRowId(null);
    setNewRow({
      col1: "",
      col2: "",
      col3: "",
      col4: "",
      col5: "",
      col6: "",
      col7: "",
      col8: "",
      col9: "",
      col10: "",
      col11: "",
    });
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // กรองแถวที่แสดงตามคำค้นหาใน 'col1' เท่านั้น
  const filteredRows = rows.filter(
    (row) => row.col1.toLowerCase().includes(searchTerm.toLowerCase()) // ค้นหาจาก 'col1' เท่านั้น
  );

  return (
    <div className="container-payProduct">
      <div className="text-center mb-4">
        <h1 className="text-title">การจ่ายสินค้า</h1>
        <p>ระบบจัดการข้อมูลการจ่ายสินค้า</p>
      </div>

      {/* แสดงการยืนยันลบ */}
      {showDeleteConfirm && (
        <div
          className="alert alert-warning alert-dismissible fade show alert-center"
          role="alert"
        >
          <strong>คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?</strong>
          <div>
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={confirmDelete}
            >
              ยืนยัน
            </button>
            <button className="btn btn-secondary btn-sm" onClick={cancelDelete}>
              ยกเลิก
            </button>
          </div>
        </div> 
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-header btn-gradient-red text-white">
          <h5 className="mb-0">เพิ่มข้อมูลการจ่ายสินค้า</h5>
        </div>
        <div className="card-payProduct-top">
          <div className="row g-2">
            {columnNames.map((column, index) => (
              <div className="col-lg-2 col-md-3 col-sm-4" key={index}>
                <label className="form-label">{column.label}</label>
                {column.key === "col2" ? (
                  <input
                    type="date"
                    name="col2"
                    value={newRow.col2}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : column.key === "col3" ? (
                  <select
                    name="col3"
                    value={newRow.col3}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    {deliverOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={column.key}
                    value={newRow[column.key]}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder={`กรอก ${column.label}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-gradient-blue" onClick={handleInsert}>
              เพิ่มข้อมูล
            </button>
          </div>
        </div>
      </div>

      <div className="card-payProduct">
        <div className="card-header btn-gradient-red text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">รายการจ่ายสินค้า</h5>
          <input
            type="text"
            className="form-control w-25"
            placeholder="ค้นหารายการจ่ายสินค้า"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="card-body-payProduct-bottom">
          <div className="table-container">
            <table className="table table-hover table-bordered mb-0">
              <thead className="head-table">
                <tr>
                  {columnNames.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    {Object.keys(row).map((key, idx) => {
                      if (key === "id") return null;

                      // ตรวจสอบว่ากำลังแก้ไขแถวนี้อยู่หรือไม่
                      if (editRowId === row.id) {
                        return (
                          <td key={idx}>
                            {key === "col2" ? (
                              <input
                                type="date"
                                name={key}
                                value={newRow[key]}
                                onChange={handleInputChange}
                                className="form-control"
                              />
                            ) : key === "col3" ? (
                              <select
                                name={key}
                                value={newRow[key]}
                                onChange={handleInputChange}
                                className="form-control"
                              >
                                {deliverOptions.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                name={key}
                                value={newRow[key]}
                                onChange={handleInputChange}
                                className="form-control"
                              />
                            )}
                          </td>
                        );
                      }

                      return <td key={idx}>{row[key]}</td>;
                    })}
                    <td>
                      {editRowId === row.id ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            className="btn-pay-save-green"
                            onClick={() => handleSaveEdit(row.id)}
                          >
                            บันทึก
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={handleCancelEdit}
                          >
                            ยกเลิก
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="btn-pay-edit"
                            onClick={() => handleEdit(row.id)}
                          >
                            แก้ไข
                          </button>
                          <button
                            className="btn-pay-delete"
                            onClick={() => handleDelete(row.id)}
                          >
                            ลบ
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiveProduct;

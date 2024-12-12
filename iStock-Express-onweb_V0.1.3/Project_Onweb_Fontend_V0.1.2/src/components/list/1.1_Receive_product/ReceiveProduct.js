import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReceiveProduct.css";
import * as XLSX from "xlsx";
import axios from "axios";

function ReceiveProduct() {
  const [receiveProducts, setReceiveProducts] = useState([]);
  const [newRow, setNewRow] = useState({
    document_No_receive: "",
    date_receive: "",
    receive_type: "",
    delivery_No_receive: "",
    ref_No_receive: "",
    code_vendor: "",
    name_vendor: "",
    name_employee: "",
    status_receive: "",
    note_receive: "",
  });
  const [editingRowIndex, setEditingRowIndex] = React.useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editedProduct, setEditedProduct] = React.useState(null);
  const [error, setError] = useState(null);
  const [receiveOptions] = useState(["รับเข้า", "ส่งออก"]);
  const [isEditing, setIsEditing] = useState(false); // สำหรับจัดการการแก้ไข
  const [columnNames] = useState([
    { key: "document_No_receive", label: "เลขที่เอกสาร" },
    { key: "date_receive", label: "วันที่" },
    { key: "receive_type", label: "ประเภทการรับ" },
    { key: "delivery_No_receive", label: "เลขที่ใบส่งของ" },
    { key: "ref_No_receive", label: "เลขที่อ้างอิง" },
    { key: "code_vendor", label: "รหัสผู้จำหน่าย" },
    { key: "name_vendor", label: "ผู้จำหน่าย" },
    { key: "name_employee", label: "ผู้รับ" },
    { key: "status_receive", label: "สถานะ" },
    { key: "note_receive", label: "หมายเหตุ" },
  ]);
  const [nestedTableVisibility, setNestedTableVisibility] = useState({});

  useEffect(() => {
    const fetchReceiveProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found!");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/receive/getAllReceives",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReceiveProducts(response.data);
      } catch (error) {
        setError("Failed to fetch ReceiveProducts");
      }
    };
    fetchReceiveProducts();
  }, []);

  const toggleNestedTable = (index) => {
    setNestedTableVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleInsert = () => {
    setReceiveProducts([...receiveProducts, newRow]);
    setNewRow({
      document_No_receive: "",
      date_receive: "",
      receive_type: "",
      delivery_No_receive: "",
      ref_No_receive: "",
      code_vendor: "",
      name_vendor: "",
      name_employee: "",
      status_receive: "",
      note_receive: "",
    });
  };

  const handleRowSelection = (index) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((row) => row !== index);
      } else {
        return [...prevSelectedRows, index];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === receiveProducts.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(receiveProducts.map((_, index) => index)); // Select all
    }
  };

  const handleClear = () => {
    setNewRow({
      document_No_receive: "",
      date_receive: "",
      receive_type: "",
      delivery_No_receive: "",
      ref_No_receive: "",
      code_vendor: "",
      name_vendor: "",
      name_employee: "",
      status_receive: "",
      note_receive: "",
    });
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);
      setReceiveProducts(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleEditClick = (index, product) => {
    setEditingRowIndex(index);
    setEditedProduct({ ...product });
  };

  const handleInputChange = (field, value) => {
    setEditedProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = (index) => {
    const updatedProducts = [...receiveProducts];
    updatedProducts[index] = { ...editedProduct };
    setReceiveProducts(updatedProducts);
    setEditingRowIndex(null);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(null);
    setEditedProduct(null);
  };

  return (
    <div className="container my-5 contentleft content">
      <div className="text-center mb-4">
        <h1 className="text-dark fw-bold">การรับสินค้า</h1>
        <p className="text-muted">ระบบจัดการข้อมูลสินค้าเข้า</p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header btn-gradient-red text-white">
          <h5 className="mb-0">เพิ่มข้อมูลสินค้า</h5>
        </div>
        <div className="card-body">
          {/* Input form for new row */}
          <form>
            {/* Row 1 */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="docNumber" className="form-label">
                  เลขที่เอกสาร
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="docNumber"
                  placeholder="กรอก เลขที่เอกสาร"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="docNumber" className="form-label">
                  ผู้จำหน่าย
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="docNumber"
                  placeholder="ผู้จำหน่าย"
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="docNumber" className="form-label">
                  วันที่รับ
                </label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  id="docNumber"
                  placeholder="วันที่รับ"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="receiver" className="form-label">
                  ผู้รับ
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="receiver"
                  placeholder="กรอก ผู้รับ"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="receiveType" className="form-label">
                  ประเภทการรับ
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="receiveType"
                  placeholder="เลือกประเภทการรับ"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="status" className="form-label">
                  สถานะ
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="status"
                  placeholder="กรอก สถานะ"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="invoiceNumber" className="form-label">
                  เลขที่ใบส่งของ
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="invoiceNumber"
                  placeholder="กรอก เลขที่ใบส่งของ"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="remark" className="form-label">
                  หมายเหตุ
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="remark"
                  placeholder="กรอก หมายเหตุ"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={handleInsert}
              >
                เพิ่มข้อมูล
              </button>
              <button
                type="reset"
                className="btn btn-secondary btn-sm"
                onClick={handleClear}
              >
                ล้างข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-container">
            <table className="table table-hover table-bordered mb-0">
              <thead className="head-table-bottom">
                <tr>
                  <th >
                    <input
                      type="checkbox"
                      checked={selectedRows.length === receiveProducts.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>รายละเอียด</th>
                  <th>เลขที่เอกสาร</th>
                  <th>วันที่</th>
                  <th>ประเภทการรับ</th>
                  <th>เลขที่ใบส่งของ</th>
                  <th>เลขที่อ้างอิง</th>
                  <th>รหัสผู้จำหน่าย</th>
                  <th>ผู้จำหน่าย</th>
                  <th>สถานะ</th>
                  <th>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {receiveProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr
                      className={selectedRows.includes(index) ? "table-active" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleRowSelection(index)}
                        />
                      </td>
                      <td className="text-center">
                        <span
                          className="toggle-icon"
                          onClick={() => toggleNestedTable(index)}
                        >
                          {nestedTableVisibility[index] ? "-" : "+"}
                        </span>
                      </td>
                      <td>{product.document_No_receive || "-"}</td>
                      <td>{formatDate(product.date_receive) || "-"}</td>
                      <td>{product.receive_type?.name_receive_type || "-"}</td>
                      <td>{product.delivery_No_receive || "-"}</td>
                      <td>{product.ref_No_receive || "-"}</td>
                      <td>{product.vendor?.code_vendor || "-"}</td>
                      <td>{product.vendor?.name_vendor || "-"}</td>
                      <td>{product.status_receive || "-"}</td>
                      <td>{product.note_receive || "-"}</td>
                    </tr>
                    {nestedTableVisibility[index] && (
                      <tr>
                        <td colSpan="11">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>Lot ผู้จำหน่าย</th>
                                <th>serial</th>
                                <th>จำนวน</th>
                                <th>หน่วย</th>
                                <th>สถานที่เก็บสินค้า</th>
                                <th>วันที่ผลิต</th>
                                <th>วันที่หมดอายุ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.main_products?.map((mainProduct, subIndex) => (
                                <tr key={subIndex}>
                                  <td>{mainProduct.code_product || "-"}</td>
                                  <td>{mainProduct.name_product || "-"}</td>
                                  <td>{mainProduct.lot_dealer_product || "-"}</td>
                                  <td>{mainProduct.amount_serial || "-"}</td>
                                  <td>{mainProduct.amount_product || "-"}</td>
                                  <td>{mainProduct.unit_product || "-"}</td>
                                  <td>{mainProduct.storage_location || "-"}</td>
                                  <td>{formatDate(mainProduct.MFG_Date) || "-"}</td>
                                  <td>{formatDate(mainProduct.EXP_Date) || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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

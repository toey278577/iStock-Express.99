import React, { useState, useEffect } from "react";
import "./Customer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as XLSX from "xlsx";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found!");
          return;
        }

        const response = await axios.get("http://localhost:5000/customer/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomer(response.data);
      } catch (error) {
        setError("Failed to fetch customers");
      }
    };
    fetchCustomer();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddProduct = () => {
    console.log("Product added:", newProduct);
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log("Imported data:", jsonData);
        setCustomer((prev) => [...prev, ...jsonData]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customer);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "Customers.xlsx");
  };

  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.3 ลูกค้า</h1>
        <button
          className="btn btn-primary buttonrigte buttonexim"
          onClick={togglePopup}
        >
          เพิ่มข้อมูล
        </button>
        <label className="btn btn-success ms-3">
          Import Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleImportExcel}
          />
        </label>
        <button
          className="btn btn-danger ms-3"
          onClick={handleExportExcel}
        >
          Export Excel
        </button>

        <div className="table-responsive MG-20PX">
          <div className="card-header d-flex justify-content-between align-items-center btn-gradient-red text-white">
            <h5 className="mb-0">ผู้จำหน่าย</h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="ค้นหารหัสสินค้า"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>รหัสลูกค้า</th>
                <th>ชื่อลูกค้า</th>
                <th>ผู้ติดต่อ</th>
                <th>ที่อยู่</th>
                <th>เบอร์โทรศัพท์</th>
                <th>หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {customer.map((item, index) => (
                <tr key={index}>
                  <td>{item.code_customer}</td>
                  <td>{item.name_customer}</td>
                  <td>{item.dealer_customer}</td>
                  <td>{item.address_customer}</td>
                  <td>{item.phone_customer}</td>
                  <td>{item.note_customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-inner">
                <h2>เพิ่มข้อมูลลูกค้า</h2>
                <div className="form-group">
                  <label>รหัสลูกค้า</label>
                  <input
                    type="text"
                    name="code_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ชื่อลูกค้า</label>
                  <input
                    type="text"
                    name="name_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ผู้ติดต่อ</label>
                  <input
                    type="text"
                    name="dealer_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ที่อยู่</label>
                  <input
                    type="text"
                    name="address_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    type="text"
                    name="phone_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>หมายเหตุ</label>
                  <input
                    type="text"
                    name="note_customer"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="use_lot"
                      onChange={handleInputChange}
                      className="checkbox-input"
                    />
                    <span className="checkbox-custom"></span>
                    ใช้งาน
                  </label>
                </div>

                <div className="form-buttons">
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleAddProduct}
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={togglePopup}
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customer;
import React, { useState, useEffect } from 'react';
import './Vendor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as XLSX from 'xlsx';

function Vendor() {
  const [seller, setVendor] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/vendor/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendor(response.data);
      } catch (err) {
        setError('Failed to fetch seller: ' + err.message);
      }
    };

    fetchVendor();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('กรุณาเลือกไฟล์ Excel');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData); // Inspect the imported data

      // Here, process and add jsonData to your newProduct or seller state if needed
    };
    reader.readAsBinaryString(file);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddProduct = () => {
    setVendor([...seller, newProduct]);
    setNewProduct({});
    togglePopup();
  };

  const handleExportExcel = () => {
    // Implement this function to export seller data to an Excel file
    const ws = XLSX.utils.json_to_sheet(seller);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendor Data');

    // Create a binary string for download
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vendor_data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSeller = seller.filter((item) =>
    item.code_vendor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.2 ผู้จำหน่าย</h1>
        <div className="d-flex buttonexim">
          <label htmlFor="import-excel" className="btn btn-success me-2">
            <i className="fas fa-file-import"></i> Import Excel
            <input
              type="file"
              id="import-excel"
              accept=".xlsx, .xls"
              style={{ display: 'none' }}
              onChange={handleImportExcel}
            />
          </label>
          <button className="btn btn-danger me-2" onClick={handleExportExcel}>
            <i className="fa fa-share-square"></i> Export Data
          </button>
          <button className="btn btn-primary buttonrigte" onClick={togglePopup}>
            เพิ่มข้อมูล
          </button>
        </div>
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
          {error ? (
            <p className="text-danger mt-3">{error}</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Code Seller</th>
                  <th>Name Seller</th>
                  <th>Dealer Seller</th>
                  <th>Address Seller</th>
                  <th>Note Seller</th>
                </tr>
              </thead>
              <tbody>
                {filteredSeller.length > 0 ? (
                  filteredSeller.map((item) => (
                    <tr key={item.vendor_ID}>
                      <td>{item.code_vendor}</td>
                      <td>{item.name_vendor}</td>
                      <td>{item.dealer_vendor}</td>
                      <td>{item.address_vendor}</td>
                      <td>{item.note_vendor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      ไม่พบข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {isPopupOpen && (
            <div className="popup">
              <div className="popup-inner">
                <h2>เพิ่มข้อมูลในตารางสินค้า</h2>
                <div className="form-group">
                  <label>รหัสผู้จำหน่าย</label>
                  <input
                    type="text"
                    name="code_vendor"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ผู้จำหน่าย</label>
                  <input
                    type="text"
                    name="name_vendor"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ชื่อผู้ติดต่อ</label>
                  <input
                    type="text"
                    name="contact_name"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>ที่อยู่</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>เบอร์โทร</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Fax</label>
                  <input
                    type="text"
                    name="fax"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>หมายเหตุ/กะ</label>
                  <input
                    type="text"
                    name="note"
                    className="form-control"
                    onChange={handleInputChange}
                  />
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

export default Vendor;

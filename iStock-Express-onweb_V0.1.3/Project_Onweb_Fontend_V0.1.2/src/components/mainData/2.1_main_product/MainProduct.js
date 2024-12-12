import React, { useState, useEffect } from 'react';
import './MainProduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import * as XLSX from 'xlsx';

function MainProduct() {
  const [mainProduct, setMainProduct] = useState([]); // State to store product data
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [newProduct, setNewProduct] = useState({
    code_product: '',
    name_product: '',
    brand_product: '',
    group_product: '',
    unit_product: '',
    buy_price: '',
    sell_price: '',
    storage_location: '',
    use_lot: false,
    use_serial: false,
    is_active: true,
  });

  // Fetch data from the backend
  useEffect(() => {
    const fetchMainProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/main_product/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMainProduct(response.data);
      } catch (error) {
        setError('Failed to fetch products');
      }
    };
    fetchMainProduct();
  }, []);
  useEffect(() => {
    if (isPopupOpen) {
      document.querySelector('.popup-inner').classList.add('show');
    } else {
      document.querySelector('.popup-inner')?.classList.remove('show');
    }
  }, [isPopupOpen]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    setMainProduct([...mainProduct, { ...newProduct, Product_ID: Date.now() }]);
    togglePopup();
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle file import (Excel)
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
      console.log(jsonData);
    };
    reader.readAsBinaryString(file);
  };
  

  // Handle file export (Excel)
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(mainProduct);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MainProduct');
    XLSX.writeFile(workbook, 'MainProductData.xlsx');
  };

  // Filter products based on search query
  const filteredProducts = mainProduct.filter(item =>
    item.code_product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1 className="mb-4">2.1 ข้อมูลสินค้า</h1>
        <div className="mb-3 d-flex justify-content-between align-items-center">
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
          </div>
          <button className="btn btn-primary buttonrigte" onClick={togglePopup}>
            เพิ่มข้อมูล
          </button>
        </div>
        <div className="table-responsive">
          <div className="card-header d-flex justify-content-between align-items-center btn-gradient-red text-white">
            <h5 className="mb-0">ข้อมูลสินค้า</h5>
            <input
              type="text"
              className="form-control w-25"
              placeholder="ค้นหารหัสสินค้า"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>รหัสสินค้า</th>
                <th>ชื่อสินค้า</th>
                <th>ยี่ห้อ</th>
                <th>กลุ่มสินค้า</th>
                <th>หน่วย</th>
                <th>ราคาซื้อ</th>
                <th>ราคาขาย</th>
                <th>สถานที่จัดเก็บ</th>
                <th>ใช้ Lot</th>
                <th>ใช้ Serial</th>
                <th>ใช้งาน</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.Product_ID}>
                  <td>{item.code_product}</td>
                  <td>{item.name_product}</td>
                  <td>{item.brand_product}</td>
                  <td>{item.group_product}</td>
                  <td>{item.unit_product}</td>
                  <td>{item.buy_price}</td>
                  <td>{item.sell_price}</td>
                  <td>{item.storage_location}</td>
                  <td>
                    <span className={`badge ${item.use_lot ? 'badge-success' : 'badge-danger'}`}>
                      {item.use_lot ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${item.use_serial ? 'badge-success' : 'badge-danger'}`}>
                      {item.use_serial ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${item.is_active ? 'badge-success' : 'badge-danger'}`}>
                      {item.is_active ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>เพิ่มข้อมูลในตารางสินค้า</h2>
            <div className="form-group">
              <label>รหัสสินค้า</label>
              <input
                type="text"
                name="code_product"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ชื่อสินค้า</label>
              <input
                type="text"
                name="name_product"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ยี่ห้อ</label>
              <input
                type="text"
                name="brand_product"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>กลุ่มสินค้า</label>
              <input
                type="text"
                name="group_product"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>หน่วย</label>
              <input
                type="text"
                name="unit_product"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ราคาซื้อ</label>
              <input
                type="number"
                name="buy_price"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ราคาขาย</label>
              <input
                type="number"
                name="sell_price"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>สถานที่จัดเก็บ</label>
              <input
                type="text"
                name="storage_location"
                className="form-control"
                onChange={handleInputChange}
              />
            </div>

            {/* Group checkboxes */}
            <div className="checkbox-group">
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  
                  name="use_lot"
                  onChange={handleInputChange}
                /> ใช้ Lot
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  name="use_serial"
                  onChange={handleInputChange}
                /> ใช้ Serial
              </div>
              <div className="checkbox-label">
                <input
                  type="checkbox"
                  name="is_active"
                  onChange={handleInputChange}
                /> ใช้งาน
              </div>
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
  );
}

export default MainProduct;

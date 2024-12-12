import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CountProducts.css";

function CountProducts() {
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [editingItemData, setEditingItemData] = useState({});
  const [newItemData, setNewItemData] = useState({
    productCode: "",
    productName: "",
    quantityCounted: "",
    unit: "",
    location: "",
    status: "",
    remark: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setItems([]);
      }
    };
    fetchItems();
  }, []);

  const columnNames = [
    { key: "productCode", label: "รหัสสินค้า" },
    { key: "productName", label: "ชื่อสินค้า" },
    { key: "quantityCounted", label: "จำนวนที่ตรวจนับ" },
    { key: "unit", label: "หน่วย" },
    { key: "location", label: "สถานที่เก็บ" },
    { key: "status", label: "สถานะ" },
    { key: "remark", label: "หมายเหตุ" },
  ];

  const handleEditItem = (index) => {
    setEditingItemIndex(index);
    setEditingItemData({ ...items[index] });
  };

  const handleSaveItem = async () => {
    try {
      const updatedItems = [...items];
      updatedItems[editingItemIndex] = editingItemData;
      setItems(updatedItems);

      await fetch(
        `http://localhost:5000/api/products/${editingItemData.productCode}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingItemData),
        }
      );

      setEditingItemIndex(null);
      setEditingItemData({});
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      const productCode = items[index].productCode;
      await fetch(`http://localhost:5000/api/products/${productCode}`, {
        method: "DELETE",
      });
      setItems(items.filter((_, itemIndex) => itemIndex !== index));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleAddNewItem = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemData),
      });
      const newItem = await response.json();
      setItems([...items, newItem]);
      setNewItemData({
        productCode: "",
        productName: "",
        quantityCounted: "",
        unit: "",
        location: "",
        status: "",
        remark: "",
      });
    } catch (err) {
      console.error("Error adding new item:", err);
    }
  };

  return (
    <div className="containerCountProduct">
      <div>
        <h1 className="TextCountProductsH1">ระบบตรวจนับสินค้า</h1>
        <p className="TextCountProductsP">ระบบจัดการสินค้าคงคลัง</p>
      </div>
      {/* ฟอร์มเพิ่มสินค้าใหม่ */}
      <div className="cardCountProductsTop">
        <div className="TextCountProductTop">เพิ่มสินค้าใหม่</div>
        <div className="cardBodyCountProductTop">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row gy-3 gx-4">
              {columnNames.map((column) => (
                <div className="col-md-4" key={column.key}>
                  <label>{column.label}</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={newItemData[column.key] || ""}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        [column.key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                className="btn btn-custom shadow-lg"
                onClick={handleAddNewItem}
              >
                <i className="fas fa-plus me-2"></i> เพิ่มสินค้า
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ตารางแสดงข้อมูลสินค้า */}
      <div className="card shadow-sm">
        <div className="card-header-countProduct-bottom">
          <h5 className="mb-0">รายการตรวจนับสินค้า</h5>
          <input
            type="text"
            className="form-control w-25"
            placeholder="ค้นหารหัสสินค้า"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="card-body-count">
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-hover table-bordered">
              <thead className="bg-light">
                <tr>
                  {columnNames.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((item) =>
                    item.productCode
                      ?.toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      {columnNames.map((column) => (
                        <td key={column.key}>
                          {editingItemIndex === index ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editingItemData[column.key] || ""}
                              onChange={(e) =>
                                setEditingItemData({
                                  ...editingItemData,
                                  [column.key]: e.target.value,
                                })
                              }
                            />
                          ) : (
                            item[column.key]
                          )}
                        </td>
                      ))}
                      <td>
                        {editingItemIndex === index ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={handleSaveItem}
                            >
                              บันทึก
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditingItemIndex(null)}
                            >
                              ยกเลิก
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning"
                              onClick={() => handleEditItem(index)}
                            >
                              แก้ไข
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteItem(index)}
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

export default CountProducts;

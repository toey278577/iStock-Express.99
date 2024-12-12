import React, { useState, useRef, useEffect } from "react";
import "./Inventory.css";

function InventoryManagement() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      code: "P001",
      name: "สินค้า A",
      quantity: 100,
      status: "พร้อมใช้งาน",
    },
    { id: 2, code: "P002", name: "สินค้า B", quantity: 50, status: "ใกล้หมด" },
    { id: 3, code: "P003", name: "สินค้า C", quantity: 50, status: "ใกล้หมด" },
    { id: 4, code: "P004", name: "สินค้า D", quantity: 50, status: "ใกล้หมด" },
    { id: 5, code: "P005", name: "สินค้า E", quantity: 50, status: "ใกล้หมด" },
    { id: 6, code: "P006", name: "สินค้า F", quantity: 50, status: "ใกล้หมด" },
    { id: 7, code: "P007", name: "สินค้า G", quantity: 50, status: "ใกล้หมด" },
    { id: 8, code: "P008", name: "สินค้า H", quantity: 50, status: "ใกล้หมด" },
    { id: 9, code: "P009", name: "สินค้า I", quantity: 50, status: "ใกล้หมด" },
    {
      id: 10,
      code: "P0010",
      name: "สินค้า J",
      quantity: 50,
      status: "ใกล้หมด",
    },
    {
      id: 11,
      code: "P0011",
      name: "สินค้า K",
      quantity: 50,
      status: "ใกล้หมด",
    },
    {
      id: 12,
      code: "P0012",
      name: "สินค้า L",
      quantity: 50,
      status: "ใกล้หมด",
    },
    // เพิ่มข้อมูลสินค้าอื่นๆ
  ]);

  // คำนวณจำนวนสินค้ารวม
  const totalQuantity = inventory.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [searchTermInventory, setSearchTermInventory] = useState("");
  const [searchTermBarcode, setSearchTermBarcode] = useState("");
  const [isBarcodeCardOpen, setIsBarcodeCardOpen] = useState(false);
  const [isBarcodeDropdownOpen, setIsBarcodeDropdownOpen] = useState(false);
  const [filteredBarcodeOptions, setFilteredBarcodeOptions] = useState([
    "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง)",
    "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง) วนซ้ำ",
    "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง) ตามจำนวน",
    "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง)",
    "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง) วนซ้ำ",
    "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง) ตามจำนวน",
  ]);

  // สร้าง reference สำหรับ input
  const searchInputRef = useRef(null);

  // ฟังก์ชันสำหรับค้นหารายการสินค้า
  const handleSearchInventory = (term) => {
    setSearchTermInventory(term);
  };

  // ฟังก์ชันสำหรับค้นหาตัวเลือกบาร์โค้ด
  const handleSearchBarcode = (term) => {
    setSearchTermBarcode(term);
    const filtered = [
      "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง)",
      "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง) วนซ้ำ",
      "พิมพ์บาร์โค้ด 2D ดวงคู่ (1รายการ 1ดวง) ตามจำนวน",
      "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง)",
      "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง) วนซ้ำ",
      "พิมพ์บาร์โค้ด 2D ดวงเดี่ยว (1รายการ 1ดวง) ตามจำนวน",
    ].filter((option) => option.toLowerCase().includes(term.toLowerCase()));
    setFilteredBarcodeOptions(filtered);
  };

  // โฟกัส input เมื่อ searchTermInventory เปลี่ยนแปลง
  useEffect(() => {
    if (searchTermInventory) {
      searchInputRef.current.focus();
    }
  }, [searchTermInventory]);

  return (
    <div>
      <div className="containerInventory ">
        <div className="text-center mb-4">
          <h1 className="text-dark fw-bold">สินค้าคงคลัง</h1>
          <p className="text-muted">ระบบจัดการข้อมูลสินค้าคงคลัง</p>
        </div>

        <div>
          <div className="headTableInventory">
            <h5 className="InventoryH5">รายการสินค้าคงคลัง</h5>
            <input
              ref={searchInputRef} // เพิ่มการอ้างอิงนี้
              className="searchInventoryTop"
              type="text"
              placeholder="ค้นหารหัสสินค้า"
              value={searchTermInventory}
              onChange={(e) => handleSearchInventory(e.target.value)}
            />
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>รหัสสินค้า</th>
                  <th>ชื่อสินค้า</th>
                  <th>จำนวน</th>
                  <th>สถานะ</th>
                  <th>ดูประวัติ</th>
                </tr>
              </thead>
              <tbody>
                {inventory
                  .filter((item) =>
                    item.code
                      .toLowerCase()
                      .includes(searchTermInventory.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => alert(`ดูประวัติของ ${item.name}`)}
                        >
                          ดูประวัติ
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ปุ่มพิมพ์บาร์โค้ด */}
        <div className="mt-4">
          <button
            className="btn btn-warning btn-sm"
            style={{ padding: "10px 20px", fontSize: "14px" }}
            onClick={() => setIsBarcodeCardOpen(true)}
          >
            พิมพ์บาร์โค้ด
          </button>
        </div>

        {/* การ์ดที่แสดงตัวเลือกการพิมพ์บาร์โค้ด */}
        {isBarcodeCardOpen && (
          <div className="card mt-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>เลือกตัวเลือกการพิมพ์บาร์โค้ด</h5>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setIsBarcodeCardOpen(false)}
              >
                ปิด
              </button>
            </div>

            <div className="card-body">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหาตัวเลือก"
                value={searchTermBarcode}
                onChange={(e) => handleSearchBarcode(e.target.value)}
              />
              <div className="dropdown mt-2">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  onClick={() => setIsBarcodeDropdownOpen((prev) => !prev)}
                >
                  เลือกตัวเลือกบาร์โค้ด
                </button>

                {isBarcodeDropdownOpen && (
                  <div
                    className="dropdown-menu mt-2"
                    style={{ display: "block" }}
                  >
                    {filteredBarcodeOptions.map((option, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => alert(`คุณเลือก: ${option}`)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <p>จำนวนสินค้าในรายการ: {inventory.length} รายการ</p>
                <p>จำนวนสินค้ารวม: {totalQuantity} ชิ้น</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryManagement;

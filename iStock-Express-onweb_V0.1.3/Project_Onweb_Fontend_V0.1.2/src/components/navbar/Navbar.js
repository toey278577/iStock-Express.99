import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faTruck,
  faUndoAlt,
  faListAlt,
  faWarehouse,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(""); // State เพื่อเก็บเมนูที่ถูกเลือก

  const handleClick = (menu) => {
    setActiveMenu(menu); // อัปเดตเมนูที่เลือกเมื่อคลิก
  };

  return (
    // เพิ่ม className 'sticky-navbar' เพื่อทำให้ Navbar ติดด้านบน
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-navbar"
      style={{ marginLeft: "275px" }} // กำหนดระยะห่างด้านซ้าย
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* เมนู รับสินค้า */}
            <li
              className={`nav-item ms-5 ${activeMenu === "receive" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/receive_product"
                onClick={() => handleClick("receive")}
              >
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
                รับสินค้า
              </a>
            </li>

            {/* เมนู จ่ายสินค้า */}
            <li
              className={`nav-item ms-5 ${activeMenu === "dispatch" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/pay_product"
                onClick={() => handleClick("dispatch")}
              >
                <FontAwesomeIcon icon={faTruck} className="me-2" />
                จ่ายสินค้า
              </a>
            </li>

            {/* เมนู รับสินค้าคืน */}
            <li
              className={`nav-item ms-5 ${activeMenu === "return" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/receive_product_returns"
                onClick={() => handleClick("return")}
              >
                <FontAwesomeIcon icon={faUndoAlt} className="me-2" />
                รับสินค้าคืน
              </a>
            </li>

            {/* เมนู ตรวจนับสินค้า */}
            <li
              className={`nav-item ms-5 ${activeMenu === "inventory" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/count_products"
                onClick={() => handleClick("inventory")}
              >
                <FontAwesomeIcon icon={faListAlt} className="me-2" />
                ตรวจนับสินค้า
              </a>
            </li>

            {/* เมนู สินค้าคงคลัง */}
            <li
              className={`nav-item ms-5 ${activeMenu === "stock" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/inventory"
                onClick={() => handleClick("stock")}
              >
                <FontAwesomeIcon icon={faWarehouse} className="me-2" />
                สินค้าคงคลัง
              </a>
            </li>

            {/* เมนู คลังสินค้าของมีปัญหา */}
            <li
              className={`nav-item ms-5 ${activeMenu === "problematic" ? "active" : ""}`}
            >
              <a
                className="nav-link fs-6"
                href="/defective_stock"
                onClick={() => handleClick("problematic")}
              >
                <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                คลังสินค้าของมีปัญหา
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

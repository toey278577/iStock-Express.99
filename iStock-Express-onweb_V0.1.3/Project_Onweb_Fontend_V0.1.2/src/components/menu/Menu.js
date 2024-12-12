import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../img/logo/logonew.png';
import './Menu.css';
import axios from 'axios'; // For API requests

function Menu() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // จัดการสถานะโหลด
  const [errorMessage, setErrorMessage] = useState(''); // จัดการข้อความผิดพลาด
  const language = 'th'; // หรือสร้างตัวเลือกภาษาจาก Context/State


  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setOpenSubmenu(menuId === openSubmenu ? null : menuId);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      setErrorMessage(language === 'th' ? 'ไม่พบการเข้าสู่ระบบ' : 'No active session found.');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const response = await axios.post(
        'http://localhost:5000/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // ล้างข้อมูลใน LocalStorage
        localStorage.removeItem('token');
        localStorage.removeItem('accessUser');
        localStorage.removeItem('rememberedUser');
        localStorage.removeItem('rememberedPassword');
  
      
        // เปลี่ยนเส้นทางกลับไปหน้า Login
        navigate('/', { state: { message: language === 'th' ? 'ออกจากระบบสำเร็จ!' : 'Logged out successfully!' } });
    
      } else {
        setErrorMessage(language === 'th' ? 'การออกจากระบบล้มเหลว' : 'Logout failed.');
      }
    } catch (error) {
      setErrorMessage(language === 'th' ? 'ข้อผิดพลาดทางเซิร์ฟเวอร์' : 'Server error');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="d-flex">
      <div className="sidebar p-3">
        <div className="text-center mb-4">
          <a href="/home">
            <img src={Logo} alt="Company Logo" className="img-fluid rounded mb-2" />
          </a>
        </div>

        <div className="list-group">
          {/* Main Menu */}
          <button
            className={`list-group-item list-group-item-action d-flex align-items-center ${activeMenu === 'menu1' ? 'active' : ''}`}
            onClick={() => handleMenuClick('menu1')}
          >
            <i className="bi bi-box me-2"></i> รายการ
          </button>
          {openSubmenu === 'menu1' && (
            <div className="submenu">
              <a href="/receive_product"><button className="submenu-item textonleft"><i className="bi bi-download me-2"></i> รับสินค้า</button></a>
              <a href="/pay_product"><button className="submenu-item textonleft"><i className="bi bi-upload me-2"></i> จ่ายสินค้า</button></a>
              <a href="/receive_product_returns"><button className="submenu-item textonleft"><i className="bi bi-arrow-repeat me-2"></i> รับคืนสินค้า</button></a>
              <a href="/count_products"><button className="submenu-item textonleft"><i className="bi bi-check-circle me-2"></i> ตรวจนับสินค้า</button></a>
              <a href="/inventory"><button className="submenu-item textonleft"><i className="bi bi-boxes me-2"></i> สินค้าคงคลัง</button></a>
              <a href="/defective_Stock"><button className="submenu-item textonleft"><i className="bi bi-exclamation-circle me-2"></i> คลังสินค้าของมีปัญหา</button></a>
            </div>
          )}

          {/* ข้อมูลหลัก */}
          <button
            className={`list-group-item list-group-item-action d-flex align-items-center ${activeMenu === 'menu2' ? 'active' : ''}`}
            onClick={() => handleMenuClick('menu2')}
          >
            <i className="bi bi-database me-2"></i> ข้อมูลหลัก
          </button>
          {openSubmenu === 'menu2' && (
            <div className="submenu">
              <a href="/main_product"><button className="submenu-item textonleft"><i className="bi bi-archive me-2"></i> ข้อมูลสินค้า</button></a>
              <a href="/vendor"><button className="submenu-item textonleft"><i className="bi bi-person-circle me-2"></i> ผู้จำหน่าย</button></a>
              <a href="/customer"><button className="submenu-item textonleft"><i className="bi bi-person-lines-fill me-2"></i> ลูกค้า</button></a>
              <a href="/storage_area"><button className="submenu-item textonleft"><i className="bi bi-geo-alt me-2"></i> ที่เก็บสินค้า</button></a>
              <a href="/employee"><button className="submenu-item textonleft"><i className="bi bi-person-badge me-2"></i> พนักงาน</button></a>
              <a href="/receive_type"><button className="submenu-item textonleft"><i className="bi bi-archive-fill me-2"></i> ประเภทการรับ</button></a>
              <a href="/payment_type"><button className="submenu-item textonleft"><i className="bi bi-credit-card me-2"></i> ประเภทการจ่าย</button></a>
              <a href="/return_type"><button className="submenu-item textonleft"><i className="bi bi-arrow-repeat me-2"></i> ประเภทการคืน</button></a>
              <a href="/issue_type"><button className="submenu-item textonleft"><i className="bi bi-bug me-2"></i> ประเภทปัญหา</button></a>
              <a href="/transfer_type"><button className="submenu-item textonleft"><i className="bi bi-arrow-left-right me-2"></i> ประเภทการโอนย้าย</button></a>
              <a href="/booking_type"><button className="submenu-item textonleft"><i className="bi bi-calendar-check me-2"></i> ประเภทการจอง</button></a>
              <a href="/security"><button className="submenu-item"><i className="bi bi-person-lock me-2"></i> ผู้ใช้งาน</button></a>
            </div>
          )}

          {/* ความปลอดภัย */}
          {/* <button
            className={`list-group-item list-group-item-action d-flex align-items-center ${activeMenu === 'menu3' ? 'active' : ''}`}
            onClick={() => handleMenuClick('menu3')}
          >
            <i className="bi bi-shield-lock me-2"></i> ความปลอดภัย
          </button>
          {openSubmenu === 'menu3' && (
            <div className="submenu">
              <a href="/security"><button className="submenu-item"><i className="bi bi-person-lock me-2"></i> ผู้ใช้งาน</button></a>
            </div>
          )} */}

          {/* รายงาน */}
          <button
            className={`list-group-item list-group-item-action d-flex align-items-center ${activeMenu === 'menu4' ? 'active' : ''}`}
            onClick={() => handleMenuClick('menu4')}
          >
            <i className="bi bi-bar-chart-line me-2"></i> รายงาน
          </button>
          {openSubmenu === 'menu4' && (
            <div className="submenu">
              <a href="/receiving_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานการรับ</button></a>
              <a href="/issuance_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานการรับแบบสรุป</button></a>
              <a href="/return_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานการจ่าย</button></a>
              <a href="/inventory_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานการจ่ายแบบสรุป</button></a>
              <a href="/nonmoving_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานสินค้าคงคลัง</button></a>
              <a href="/storage_move_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานการโอนย้าย</button></a>
              <a href="/storage_move_report"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> รายงานใบจอง</button></a>
              <a href="/"><button className="submenu-item"><i className="bi bi-file-earmark-text me-2"></i> สอบถาม</button></a>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="logout-container">
  <button
    className="list-group-item list-group-item-action d-flex align-items-center"
    onClick={handleLogout}
    disabled={isLoading} // ปิดการใช้งานปุ่มขณะกำลังประมวลผล
  >
    <i className="bi bi-box-arrow-left me-2"></i>
    {isLoading
      ? <span>{language === 'th' ? 'กำลังออกจากระบบ...' : 'Logging out...'}</span>
      : <span>{language === 'th' ? 'ออกจากระบบ' : 'Logout'}</span>}
  </button>

  {errorMessage && (
    <div className="error-message mt-2">
      <p className="text-danger">{errorMessage}</p>
    </div>
  )}
</div>


      </div>
    </div>
  );
}

export default Menu;

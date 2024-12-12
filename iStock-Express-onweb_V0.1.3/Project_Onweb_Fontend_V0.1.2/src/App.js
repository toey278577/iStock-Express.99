import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import ReceiveProduct from './components/list/1.1_Receive_product/ReceiveProduct';
import PayProduct from './components/list/1.2_pay_product/PayProduct';
import ReceiveProductReturns from './components/list/1.3_Receive_product_returns/ReceiveProductReturns';
import CountProducts from './components/list/1.4_Count_products/CountProducts';
import Inventory from './components/list/1.5_Inventory/Inventory';
import DefectiveStock from './components/list/1.6_Defective_Stock/DefectiveStock';
import MainProduct from './components/mainData/2.1_main_product/MainProduct';
import Vendor from './components/mainData/2.2_vendor/Vendor';
import Customer from './components/mainData/2.3_customer/Customer';
import StorageArea from './components/mainData/2.4_storage_area/StorageArea';
import Employee from './components/mainData/2.5_employee/Employee';
import ReceiveType from './components/mainData/2.6_receive_type/ReceiveType';
import PaymentType from './components/mainData/2.7_payment_type/PaymentType';
import ReturnType from './components/mainData/2.8_return_type/ReturnType';
import IssueType from './components/mainData/2.9_issue_type/IssueType';
import TransferType from './components/mainData/2.10_transfer_type/TransferType';
import BookingType from './components/mainData/2.11_booking_type/BookingType';
import Security from './components/security/Security';
import ReceivingReport from './components/report/4.1_Receiving_Report/ReceivingReport';
import IssuanceReport from './components/report/4.2_Issuance_Report/IssuanceReport';
import ReturnReport from './components/report/4.3_Return_Report/ReturnReport';
import InventoryReport from './components/report/4.4_Inventory_Report/InventoryReport';
import NonMovingReport from './components/report/4.5_NonMoving_Report/NonMovingReport';
import MonthlyActivity from './components/report/4.6_Monthly_Activity/MonthlyActivity';
import StorageMoveReport from './components/report/4.7_Storage_Move_Report/StorageMoveReport';

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // ตรวจสอบ Token
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Menu />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/receive_product" element={<ProtectedRoute><ReceiveProduct /></ProtectedRoute>} />
        <Route path="/pay_product" element={<ProtectedRoute><PayProduct /></ProtectedRoute>} />
        <Route path="/receive_product_returns" element={<ProtectedRoute><ReceiveProductReturns /></ProtectedRoute>} />
        <Route path="/count_products" element={<ProtectedRoute><CountProducts /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/defective_stock" element={<ProtectedRoute><DefectiveStock /></ProtectedRoute>} />
        <Route path="/main_product" element={<ProtectedRoute><MainProduct /></ProtectedRoute>} />
        <Route path="/vendor" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
        <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
        <Route path="/storage_area" element={<ProtectedRoute><StorageArea /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
        <Route path="/receive_type" element={<ProtectedRoute><ReceiveType /></ProtectedRoute>} />
        <Route path="/payment_type" element={<ProtectedRoute><PaymentType /></ProtectedRoute>} />
        <Route path="/return_type" element={<ProtectedRoute><ReturnType /></ProtectedRoute>} />
        <Route path="/issue_type" element={<ProtectedRoute><IssueType /></ProtectedRoute>} />
        <Route path="/transfer_type" element={<ProtectedRoute><TransferType /></ProtectedRoute>} />
        <Route path="/booking_type" element={<ProtectedRoute><BookingType /></ProtectedRoute>} />
        <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
        <Route path="/receiving_report" element={<ProtectedRoute><ReceivingReport /></ProtectedRoute>} />
        <Route path="/issuance_report" element={<ProtectedRoute><IssuanceReport /></ProtectedRoute>} />
        <Route path="/return_report" element={<ProtectedRoute><ReturnReport /></ProtectedRoute>} />
        <Route path="/inventory_report" element={<ProtectedRoute><InventoryReport /></ProtectedRoute>} />
        <Route path="/nonmoving_report" element={<ProtectedRoute><NonMovingReport /></ProtectedRoute>} />
        <Route path="/monthly_activity" element={<ProtectedRoute><MonthlyActivity /></ProtectedRoute>} />
        <Route path="/storage_move_report" element={<ProtectedRoute><StorageMoveReport /></ProtectedRoute>} />
      </Routes>

      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;

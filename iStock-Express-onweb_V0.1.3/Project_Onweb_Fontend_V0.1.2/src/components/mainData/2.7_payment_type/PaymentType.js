import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentType.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function PaymentType() {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/payment_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setPaymentTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchPaymentTypes();
  }, []);



  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.7 ประเภทการชำระเงิน</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ประเภทการจ่าย</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {paymentTypes.map((type) => (
              <tr key={type.payment_type_ID}>
                <td>{type.name_payment_type}</td>
                <td>{type.note_payment_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentType;

import React, { useState, useEffect } from 'react';
import './TransferType.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function TransferType() {
  const [transferTypes, setTransferTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchTransferTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/transfer_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTransferTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchTransferTypes();
  }, []);


  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.10 ประเภทการโอน</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ชื่อประเภทการโอน</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {transferTypes.map((type) => (
              <tr key={type.transfer_type_ID}>
                <td>{type.name_transfer_type}</td>
                <td>{type.note_transfer_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransferType;

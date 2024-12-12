import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReceiveType.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReceiveType() {
  const [receiveTypes, setReceiveTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchReceiveTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/receive_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setReceiveTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchReceiveTypes();
  }, []);



  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.6 ประเภทการรับ</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ชื่อประเภทการรับ</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {receiveTypes.map((type) => (
              <tr key={type.receive_type_ID}>
                <td>{type.name_receive_type}</td>
                <td>{type.note_receive_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReceiveType;

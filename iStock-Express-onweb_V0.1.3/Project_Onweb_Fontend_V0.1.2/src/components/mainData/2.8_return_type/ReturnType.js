import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReturnType.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReturnType() {
  const [returnTypes, setReturnTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchReturnTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/return_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setReturnTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchReturnTypes();
  }, []);


  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.8 ประเภทการคืน</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ชื่อประเภทการคืน</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(returnTypes) &&
              returnTypes.map((type) => (
                <tr key={type.return_type_ID}>
                  <td>{type.name_return_type}</td>
                  <td>{type.note_return_type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReturnType;

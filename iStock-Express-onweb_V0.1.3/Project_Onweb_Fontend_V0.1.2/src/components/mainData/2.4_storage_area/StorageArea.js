import React, { useState, useEffect } from 'react';
import './StorageArea.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Storage_Area() {
  const [storage_area, setStorage_Area] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchStorage_Area = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/storage_area/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setStorage_Area(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchStorage_Area();
  }, []);

  

  const handleCheckboxChange = (id, field, checked) => {
    const updatedData = storage_area.map((item) =>
      item.storage_area_ID === id ? { ...item, [field]: checked ? 'yes' : 'no' } : item
    );
    setStorage_Area(updatedData);

    axios
      .put(`http://localhost:5000/storage_area/${id}`, {
        [field]: checked ? 'yes' : 'no',
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.4 ที่เก็บสินค้า</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ตำแหน่งพื้นที่เก็บสินค้า</th>
              <th>ใช้งาน</th>
            </tr>
          </thead>
          <tbody>
            {storage_area.map((item) => (
              <tr key={item.storage_area_ID}>
                <td>{item.location_storage_area}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.use_storage_area === 'yes'}
                    onChange={(e) =>
                      handleCheckboxChange(item.storage_area_ID, 'use_storage_area', e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Storage_Area;

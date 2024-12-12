import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingType.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookingType() {
  const [bookingTypes, setBookingTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchBookingTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/booking_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBookingTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchBookingTypes();
  }, []);

  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.11 ประเภทการจอง</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ชื่อประเภทการจอง</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {bookingTypes.map((type) => (
              <tr key={type.booking_type_ID}>
                <td>{type.name_booking_type}</td>
                <td>{type.note_booking_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingType; 

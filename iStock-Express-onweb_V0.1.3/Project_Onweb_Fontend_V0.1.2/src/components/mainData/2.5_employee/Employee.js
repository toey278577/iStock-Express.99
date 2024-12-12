import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employee.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/employee/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchEmployees();
  }, []);



  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.5 พนักงาน</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>เบอร์โทร</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employee_ID}>
                <td>{employee.code_employee}</td>
                <td>{employee.firstname_employee}</td>
                <td>{employee.lastname_employee}</td>
                <td>{employee.phone_employee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;

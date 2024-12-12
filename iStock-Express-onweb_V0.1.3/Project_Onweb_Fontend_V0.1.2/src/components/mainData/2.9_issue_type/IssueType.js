import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueType.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IssueType() {
  const [issueTypes, setIssueTypes] = useState([]);
  const [error, setError] = useState(null); // Add this line to define setError

  useEffect(() => {
    const fetchIssueTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found!');
          return;
        }

        const response = await axios.get('http://localhost:5000/issue_type/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setIssueTypes(response.data);
      } catch (error) {
        setError('Failed to fetch ReceiveProducts');
      }
    };
    fetchIssueTypes();
  }, []);


  return (
    <div className="d-flex bgcolor">
      <div className="content">
        <h1>2.9 ประเภทปัญหา</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ชื่อประเภทปัญหา</th>
              <th>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {issueTypes.map((type) => (
              <tr key={type.issue_type_ID}>
                <td>{type.name_issue_type}</td>
                <td>{type.note_issue_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueType;

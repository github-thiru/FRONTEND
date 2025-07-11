import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  // Fetch all students
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error('Error fetching students:', err));
  }, []);

  return (
    <div>
      <h3>All Students</h3>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.rollNo}</td>
              <td>{s.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

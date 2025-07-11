import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    department: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', student);
      alert('Student added successfully');
      setStudent({ name: '', rollNo: '', department: '' });
    } catch (error) {
      alert('Error adding student');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <h3>Add New Student</h3>
      <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input type="text" name="rollNo" placeholder="Roll No" value={student.rollNo} onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" value={student.department} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;

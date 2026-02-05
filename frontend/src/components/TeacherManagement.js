import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { teacherAPI } from '../services/api';

function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    salary: '',
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await teacherAPI.getAll();
      setTeachers(response.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await teacherAPI.update(editingTeacher._id, formData);
      } else {
        await teacherAPI.create(formData);
      }
      fetchTeachers();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving teacher:', error);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      experience: teacher.experience,
      salary: teacher.salary,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await teacherAPI.delete(id);
        fetchTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', experience: '', salary: '' });
    setEditingTeacher(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex align-center justify-between mb-30">
        <motion.h1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="welcome-text"
          style={{ fontSize: '32px' }}
        >
          Teacher Management
        </motion.h1>
        <motion.button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> Add Teacher
        </motion.button>
      </div>

      <div className="table-container glass-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Experience (years)</th>
              <th>Salary</th>
              <th>Assigned Courses</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <motion.tr
                key={teacher._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.experience || '0'}</td>
                <td>${teacher.salary}</td>
                <td>{teacher.assignedCourses?.length || 0}</td>
                <td>{new Date(teacher.hireDate).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-10">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(teacher)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(teacher._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-center justify-between mb-20">
              <h2>{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h2>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="form-control"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  min="0"
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary mt-20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSave /> {editingTeacher ? 'Update' : 'Save'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default TeacherManagement;
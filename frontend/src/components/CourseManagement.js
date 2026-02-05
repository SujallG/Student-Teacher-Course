import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { courseAPI, studentAPI, teacherAPI } from '../services/api';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseCode: '',
    name: '',
    description: '',
    credits: '',
    duration: '3 months',
    fee: '',
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [coursesRes, studentsRes, teachersRes] = await Promise.all([
        courseAPI.getAll(),
        studentAPI.getAll(),
        teacherAPI.getAll()
      ]);
      setCourses(coursesRes.data || []);
      setStudents(studentsRes.data || []);
      setTeachers(teachersRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      if (editingCourse) {
        await courseAPI.update(editingCourse._id, formData);
      } else {
        await courseAPI.create(formData);
      }
      fetchAllData();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleEnrollStudents = async () => {
    try {
      for (const studentId of selectedStudents) {
        await studentAPI.enroll(studentId, selectedCourse._id);
      }
      fetchAllData();
      setShowEnrollModal(false);
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error enrolling students:', error);
    }
  };

  const handleAssignTeachers = async () => {
    try {
      for (const teacherId of selectedTeachers) {
        await teacherAPI.assign(teacherId, selectedCourse._id);
      }
      fetchAllData();
      setShowAssignModal(false);
      setSelectedTeachers([]);
    } catch (error) {
      console.error('Error assigning teachers:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      courseCode: course.courseCode,
      name: course.name,
      description: course.description,
      credits: course.credits,
      duration: course.duration,
      fee: course.fee,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseAPI.delete(id);
        fetchAllData();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      courseCode: '',
      name: '',
      description: '',
      credits: '',
      duration: '3 months',
      fee: '',
    });
    setEditingCourse(null);
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
          Course Management
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
          <FaPlus /> Add Course
        </motion.button>
      </div>

      <div className="table-container glass-card">
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Credits</th>
              <th>Duration</th>
              <th>Fee</th>
              <th>Teachers</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <motion.tr
                key={course._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>{course.courseCode}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.credits}</td>
                <td>{course.duration}</td>
                <td>${course.fee || '0'}</td>
                <td>{course.assignedTeachers?.length || 0}</td>
                <td>{course.enrolledStudents?.length || 0}</td>
                <td>
                  <div className="d-flex gap-10">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(course)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(course._id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowEnrollModal(true);
                      }}
                    >
                      <FaUserGraduate />
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowAssignModal(true);
                      }}
                    >
                      <FaChalkboardTeacher />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Form Modal */}
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
              <h2>{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
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
                <label>Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course Name</label>
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
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  rows="3"
                />
              </div>
              <div className="grid grid-3 gap-20">
                <div className="form-group">
                  <label>Credits</label>
                  <input
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    min="1"
                    max="6"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fee ($)</label>
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                    className="form-control"
                    min="0"
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary mt-20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSave /> {editingCourse ? 'Update' : 'Save'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Enroll Students Modal */}
      {showEnrollModal && selectedCourse && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowEnrollModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-center justify-between mb-20">
              <h2>Enroll Students in {selectedCourse.name}</h2>
              <button
                className="btn btn-danger"
                onClick={() => setShowEnrollModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="form-group">
              <label>Select Students to Enroll</label>
              <select
                multiple
                className="form-control"
                style={{ height: '200px' }}
                value={selectedStudents}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedStudents(values);
                }}
              >
                {students.map(student => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
              <small className="text-muted">Hold Ctrl to select multiple students</small>
            </div>
            <motion.button
              className="btn btn-success mt-20"
              onClick={handleEnrollStudents}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserGraduate /> Enroll Selected Students
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Assign Teachers Modal */}
      {showAssignModal && selectedCourse && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAssignModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-center justify-between mb-20">
              <h2>Assign Teachers to {selectedCourse.name}</h2>
              <button
                className="btn btn-danger"
                onClick={() => setShowAssignModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="form-group">
              <label>Select Teachers to Assign</label>
              <select
                multiple
                className="form-control"
                style={{ height: '200px' }}
                value={selectedTeachers}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedTeachers(values);
                }}
              >
                {teachers.map(teacher => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name} ({teacher.email})
                  </option>
                ))}
              </select>
              <small className="text-muted">Hold Ctrl to select multiple teachers</small>
            </div>
            <motion.button
              className="btn btn-primary mt-20"
              onClick={handleAssignTeachers}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaChalkboardTeacher /> Assign Selected Teachers
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CourseManagement;
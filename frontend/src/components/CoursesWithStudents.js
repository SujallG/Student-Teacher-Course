import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBook } from 'react-icons/fa';
import { courseAPI } from '../services/api';

function CoursesWithStudents() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCoursesWithStudents();
  }, []);

  const fetchCoursesWithStudents = async () => {
    try {
      const response = await courseAPI.getWithStudents();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses with students:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="welcome-text mb-30"
        style={{ fontSize: '32px' }}
      >
        <FaBook /> Courses with Enrolled Students
      </motion.h1>

      <div className="grid grid-2 gap-30">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            className="glass-card"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="d-flex align-center justify-between mb-20">
              <div>
                <h3 style={{ color: 'white', marginBottom: '5px' }}>
                  {course.courseCode} - {course.name}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {course.description}
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaBook size={32} color="#48bb78" />
              </motion.div>
            </div>
            
            <div className="mb-20">
              <div className="d-flex align-center gap-10 mb-10">
                <FaUserGraduate color="#ed8936" />
                <strong style={{ color: 'white' }}>Enrolled Students:</strong>
                <span style={{ color: 'white', marginLeft: '10px' }}>
                  {course.enrolledStudents?.length || 0} students
                </span>
              </div>
              
              {course.enrolledStudents && course.enrolledStudents.length > 0 ? (
                <div className="student-list">
                  {course.enrolledStudents.map((student, idx) => (
                    <motion.div
                      key={student._id}
                      className="student-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '10px',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="d-flex align-center justify-between">
                        <div>
                          <div style={{ color: 'white', fontWeight: '500' }}>
                            {student.name}
                          </div>
                          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                            {student.email}
                          </div>
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                          Age: {student.age}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="text-center p-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    No students enrolled in this course yet.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="d-flex justify-between mt-20">
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <strong>Total Enrolled:</strong> {course.enrolledStudents?.length || 0}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <strong>Credits:</strong> {course.credits}
                </div>
              </div>
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <strong>Fee:</strong> ${course.fee || '0'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default CoursesWithStudents;
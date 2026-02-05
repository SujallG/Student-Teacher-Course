import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { courseAPI } from '../services/api';

function CoursesWithTeachers() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCoursesWithTeachers();
  }, []);

  const fetchCoursesWithTeachers = async () => {
    try {
      const response = await courseAPI.getWithTeachers();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses with teachers:', error);
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
        <FaBook /> Courses with Assigned Teachers
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
                <FaBook size={32} color="#667eea" />
              </motion.div>
            </div>
            
            <div className="mb-20">
              <div className="d-flex align-center gap-10 mb-10">
                <FaChalkboardTeacher color="#764ba2" />
                <strong style={{ color: 'white' }}>Assigned Teachers:</strong>
                <span style={{ color: 'white', marginLeft: '10px' }}>
                  {course.assignedTeachers?.length || 0} teachers
                </span>
              </div>
              
              {course.assignedTeachers && course.assignedTeachers.length > 0 ? (
                <div className="teacher-list">
                  {course.assignedTeachers.map((teacher, idx) => (
                    <motion.div
                      key={teacher._id}
                      className="teacher-item"
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
                            {teacher.name}
                          </div>
                          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                            {teacher.email}
                          </div>
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                          Exp: {teacher.experience || 0} years
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
                    No teachers assigned to this course yet.
                  </p>
                </motion.div>
              )}
            </div>

            <div className="d-flex justify-between mt-20">
              <div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <strong>Credits:</strong> {course.credits}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <strong>Duration:</strong> {course.duration}
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

export default CoursesWithTeachers;
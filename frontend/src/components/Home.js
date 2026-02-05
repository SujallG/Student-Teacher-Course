import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChalkboardTeacher, FaBook, FaChartLine } from 'react-icons/fa';
import { studentAPI, teacherAPI, courseAPI } from '../services/api';

function Home() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    enrollments: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, teachersRes, coursesRes] = await Promise.all([
        studentAPI.getAll(),
        teacherAPI.getAll(),
        courseAPI.getAll()
      ]);
      
      setStats({
        students: studentsRes.data?.length || 0,
        teachers: teachersRes.data?.length || 0,
        courses: coursesRes.data?.length || 0,
        enrollments: 0 // You might want to calculate this differently
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    { icon: <FaUsers />, value: stats.students, label: 'Total Students', color: '#667eea' },
    { icon: <FaChalkboardTeacher />, value: stats.teachers, label: 'Total Teachers', color: '#764ba2' },
    { icon: <FaBook />, value: stats.courses, label: 'Total Courses', color: '#48bb78' },
    { icon: <FaChartLine />, value: stats.enrollments, label: 'Total Enrollments', color: '#ed8936' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-container"
    >
      <motion.h1
        className="welcome-text"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Welcome to EduManage Pro
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '18px' }}
      >
        Manage Students, Teachers, and Courses with Ease
      </motion.p>

      <div className="stats-grid mt-30">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="d-flex align-center justify-between">
              <div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
              <motion.div
                style={{ fontSize: '32px', color: stat.color }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {stat.icon}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Home;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaUsers, FaUserGraduate, FaHome } from 'react-icons/fa';
import './App.css';

// Import Components
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import CourseManagement from './components/CourseManagement';
import CoursesWithTeachers from './components/CoursesWithTeachers';
import CoursesWithStudents from './components/CoursesWithStudents';
import Home from './components/Home';

function App() {
  const menuItems = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/students", name: "Students", icon: <FaGraduationCap /> },
    { path: "/teachers", name: "Teachers", icon: <FaChalkboardTeacher /> },
    { path: "/courses", name: "Courses", icon: <FaBook /> },
    { path: "/courses-teachers", name: "Courses with Teachers", icon: <FaUsers /> },
    { path: "/courses-students", name: "Courses with Students", icon: <FaUserGraduate /> },
  ];

  return (
    <Router>
      <div className="app">
        {/* Animated Background */}
        <div className="animated-bg">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-shape"
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                background: `rgba(255, 255, 255, ${Math.random() * 0.1})`
              }}
            />
          ))}
        </div>

        {/* Sidebar Navigation */}
        <motion.nav 
          className="sidebar"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FaGraduationCap className="logo-icon" />
            <h2>EduManage Pro</h2>
          </motion.div>
          
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <motion.li 
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.path} className="nav-link">
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/courses-teachers" element={<CoursesWithTeachers />} />
            <Route path="/courses-students" element={<CoursesWithStudents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
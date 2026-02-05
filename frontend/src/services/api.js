import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Students API
export const studentAPI = {
  getAll: () => API.get('/students'),
  getById: (id) => API.get(`/students/${id}`),
  create: (student) => API.post('/students', student),
  update: (id, student) => API.put(`/students/${id}`, student),
  delete: (id) => API.delete(`/students/${id}`),
  enroll: (studentId, courseId) => 
    API.post(`/students/${studentId}/courses/${courseId}`),
};

// Teachers API
export const teacherAPI = {
  getAll: () => API.get('/teachers'),
  getById: (id) => API.get(`/teachers/${id}`),
  create: (teacher) => API.post('/teachers', teacher),
  update: (id, teacher) => API.put(`/teachers/${id}`, teacher),
  delete: (id) => API.delete(`/teachers/${id}`),
  assign: (teacherId, courseId) => 
    API.post(`/teachers/${teacherId}/courses/${courseId}`),
};

// Courses API
export const courseAPI = {
  getAll: () => API.get('/courses'),
  getById: (id) => API.get(`/courses/${id}`),
  create: (course) => API.post('/courses', course),
  update: (id, course) => API.put(`/courses/${id}`, course),
  delete: (id) => API.delete(`/courses/${id}`),
  getWithTeachers: () => API.get('/courses/with-teachers'),
  getWithStudents: () => API.get('/courses/with-students'),
};
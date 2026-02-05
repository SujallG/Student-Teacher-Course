import CourseRepository from "./course.repository.js";
const courseRepository = new CourseRepository();

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseRepository.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await courseRepository.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await courseRepository.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await courseRepository.updateCourse(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const result = await courseRepository.deleteCourse(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCoursesWithTeachers = async (req, res) => {
  try {
    const courses = await courseRepository.getCoursesWithTeachers();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoursesWithStudents = async (req, res) => {
  try {
    const courses = await courseRepository.getCoursesWithStudents();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
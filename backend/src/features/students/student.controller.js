import StudentRepository from "./student.repository.js";
const studentRepository = new StudentRepository();

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentRepository.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await studentRepository.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await studentRepository.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await studentRepository.updateStudent(req.params.id, req.body);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const result = await studentRepository.deleteStudent(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const enrollStudentInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const result = await studentRepository.enrollStudentInCourse(studentId, courseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
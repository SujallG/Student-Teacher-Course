import TeacherRepository from "./teacher.repository.js";
const teacherRepository = new TeacherRepository();

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherRepository.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherRepository.getTeacherById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherRepository.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherRepository.updateTeacher(req.params.id, req.body);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const result = await teacherRepository.deleteTeacher(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const assignTeacherToCourse = async (req, res) => {
  try {
    const { teacherId, courseId } = req.params;
    const result = await teacherRepository.assignTeacherToCourse(teacherId, courseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
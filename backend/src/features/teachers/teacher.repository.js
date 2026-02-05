import teacherModel from './teacher.schema.js';
import courseModel from '../courses/course.schema.js';

export default class TeacherRepository {
  // GET /api/teachers
  async getAllTeachers() {
    return await teacherModel.find();
  }

  // GET /api/teachers/:id
  async getTeacherById(id) {
    return await teacherModel.findById(id)
  }

  // POST /api/teachers
  async createTeacher(teacherData) {
    // Check if teacherId or email already exists
    const existingTeacher = await teacherModel.findOne(
        { email: teacherData.email }
    );

    if (existingTeacher) {
        throw new Error('Email already exists');
    }

    const teacher = new teacherModel(teacherData);
    return await teacher.save();
  }

  // PUT /api/teachers/:id
  async updateTeacher(id, updateData) {
    // Prevent updating teacherId and email
    if (updateData.email) {
        throw new Error('Cannot update email');
    }

    return await teacherModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
  }

  // DELETE /api/teachers/:id
  async deleteTeacher(id) {
    const teacher = await teacherModel.findById(id);
    
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    // Remove teacher from all assigned courses
    if (teacher.assignedCourses.length > 0) {
    await courseModel.updateMany(
        { _id: { $in: teacher.assignedCourses } },
        { $pull: { assignedTeachers: id } }
    );
    }

    await teacherModel.findByIdAndDelete(id);
    return { message: 'Teacher deleted successfully' };
  }

  // POST /api/teachers/:teacherId/courses/:courseId
  async assignTeacherToCourse(teacherId, courseId) {
    // Validate teacher exists
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    const course = await courseModel.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    // Check if teacher already assigned
    if (teacher.assignedCourses.includes(courseId)) {
        throw new Error('Teacher already assigned to this course');
    }

    teacher.assignedCourses.push(courseId);
    await teacher.save();

    course.assignedTeachers.push(teacherId);
    await course.save();

    return {
    teacher: teacher.name,
    course: course.name,
    message: 'Teacher assigned successfully'
    };
  }
}

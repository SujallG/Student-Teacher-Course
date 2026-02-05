import studentModel from './student.schema.js';
import courseModel from '../courses/course.schema.js';

export default class StudentRepository{
  // GET /api/students
  async getAllStudents() {
    return await studentModel.find();
  }

  // GET /api/students/:id
  async getStudentById(id) {
    return await studentModel.findById(id);
  }

  // POST /api/students
  async createStudent(studentData) {
    // Check if studentId or email already exists
    const existingStudent = await studentModel.findOne(
        {email: studentData.email}
    );

    if (existingStudent) {
        throw new Error('Email already exists');
    }

    const student = new studentModel(studentData);
    return await student.save();
  }

  // PUT /api/students/:id
  async updateStudent(id, updateData) {
    // Prevent updating studentId and email
    if (updateData.email) {
        throw new Error('Cannot update email');
    }

    return await studentModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
  }

  // DELETE /api/students/:id
  async deleteStudent(id) {
    const student = await studentModel.findById(id);
    
    if (!student) {
    throw new Error('Student not found');
    }

    // Remove student from all enrolled courses
    if (student.enrolledCourses.length > 0) {
    await courseModel.updateMany(
        { _id: { $in: student.enrolledCourses } },
        { $pull: { enrolledStudents: id } }
    );
    }

    await studentModel.findByIdAndDelete(id);
    return { message: 'Student deleted successfully' };
  }

  // POST /api/students/:studentId/courses/:courseId
  async enrollStudentInCourse(studentId, courseId) {
    // Validate student exists
    const student = await studentModel.findById(studentId);
    if (!student) {
    throw new Error('Student not found');
    }

    // Validate course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
    throw new Error('Course not found');
    }

    if (student.enrolledCourses.includes(courseId)) {
    throw new Error('Student already enrolled in this course');
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    course.enrolledStudents.push({_id: studentId});
    await course.save();

    return {
    student: student.name,
    course: course.name,
    message: 'Student enrolled successfully'
    };
  }
}

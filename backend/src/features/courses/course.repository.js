import courseModel from "./course.schema.js";
import studentModel from "../students/student.schema.js";
import teacherModel from "../teachers/teacher.schema.js";

export default class CourseRepository {
  // GET /api/courses
  async getAllCourses() {
    return await courseModel.find()
  }

  // GET /api/courses/:id
  async getCourseById(id) {
    return await courseModel.findById(id)
  }

  // POST /api/courses
  async createCourse(courseData) {
    const existingCourse = await courseModel.findOne({ 
    courseCode: courseData.courseCode 
    });

    if (existingCourse) {
    throw new Error('Course code already exists');
    }

    const course = new courseModel(courseData);
    return await course.save();
  }

  // PUT /api/courses/:id
  async updateCourse(id, updateData) {
    // Prevent updating courseCode
    if (updateData.courseCode) {
        throw new Error('Cannot update course code');
    }

    return await courseModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
  }

  // DELETE /api/courses/:id
  async deleteCourse(id) {
    const course = await courseModel.findById(id);
    
    if (!course) {
    throw new Error('Course not found');
    }

    // Remove course from all enrolled students
    if (course.enrolledStudents.length > 0) {
    await studentModel.updateMany(
        { _id: { $in: course.enrolledStudents } },
        { $pull: { enrolledCourses: id } }
    );
    }

    // Remove course from all assigned teachers
    if (course.assignedTeachers.length > 0) {
    await teacherModel.updateMany(
        { _id: { $in: course.assignedTeachers } },
        { $pull: { assignedCourses: id } }
    );
    }

    await courseModel.findByIdAndDelete(id);
    return { message: 'Course deleted successfully' };
  }

  // GET /api/courses/with-teachers
  async getCoursesWithTeachers() {
    return await courseModel.find()
    .populate('assignedTeachers', 'name email specialization department')
    .select('courseCode name description credits assignedTeachers')
    .sort({ courseCode: 1 })
    .exec();
  }
  
  // GET /api/courses/with-students
  async getCoursesWithStudents() {
    return await courseModel.find()
    .populate('enrolledStudents', 'name email studentId age')
    .select('courseCode name description credits enrolledStudents maxStudents')
    .sort({ courseCode: 1 })
    .exec();
  }
}

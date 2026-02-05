// models/Teacher.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  experience: {
    type: Number,
    min: [0, 'Experience cannot be negative']
  },
  // Reference to assigned courses
  assignedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  hireDate: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  }
}, {
  timestamps: true
});

const teacherModel = mongoose.model('Teacher', teacherSchema);
export default teacherModel;
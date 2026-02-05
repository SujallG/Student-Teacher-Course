// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [3, 'Age must be at least 3'],
    max: [60, 'Age cannot exceed 60']
  },
  // Reference to enrolled courses
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  enrollmentDate: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true
});

const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;
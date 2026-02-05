import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: [true, 'Course code is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    credits: {
        type: Number,
        required: [true, 'Credits are required'],
        min: [1, 'Credits must be at least 1'],
        max: [6, 'Credits cannot exceed 6']
    },
    duration: {
        type: String,
        enum: ['3 months', '6 months', '1 year']
    },
    // Reference to assigned(Many-to-Many)
    assignedTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    }],
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    fee: {
        type: Number,
        min: [0, 'Fee cannot be negative']
    }
}, {
    timestamps: true
});

const courseModel = mongoose.model('Course', courseSchema);
export default courseModel;
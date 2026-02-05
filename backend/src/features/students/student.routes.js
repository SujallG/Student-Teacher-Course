import express from "express";

import {getAllStudents,getStudentById,createStudent,updateStudent,deleteStudent,enrollStudentInCourse} from "./student.controller.js"

const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/:studentId/courses/:courseId", enrollStudentInCourse);

export default router;
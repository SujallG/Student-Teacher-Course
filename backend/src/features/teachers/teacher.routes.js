import express from "express";

import { getAllTeachers,getTeacherById,createTeacher,updateTeacher,deleteTeacher,assignTeacherToCourse } from "./teacher.controller.js";

const router = express.Router();

router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);
router.post("/:teacherId/courses/:courseId", assignTeacherToCourse);

export default router;
import express from "express";

import {getAllCourses,getCourseById,createCourse,updateCourse,deleteCourse,getCoursesWithTeachers,getCoursesWithStudents} from "./course.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/with-teachers", getCoursesWithTeachers);
router.get("/with-students", getCoursesWithStudents);  
router.post("/", createCourse);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
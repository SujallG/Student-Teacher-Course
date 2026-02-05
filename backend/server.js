import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connectToDB from "./src/config/mongoDB.js";
import studentRouter from "./src/features/students/student.routes.js";
import teacherRouter from "./src/features/teachers/teacher.routes.js";
import courseRouter from "./src/features/courses/course.routes.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/students", studentRouter);
server.use("/api/teachers", teacherRouter);
server.use("/api/courses", courseRouter);

server.use((req, res) => {
    res.status(404).send("Api not found");
})

server.listen(3000, () => {
    console.log("server listening at 3000...");
    connectToDB();
});
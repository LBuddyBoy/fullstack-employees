import express from "express";
import router from "#api/employees";
const app = express();

app.use(express.json());

app.use("/employees", router);

app.get("/", (req, res) => {
    res.send("Welcome to the Fullstack Employees API.");
});

export default app;

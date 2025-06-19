import express from "express";
import {
  getEmployee,
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "#db/queries/employees";
const router = express.Router();

router.use((req, res, next) => {
  try {
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const employees = await getEmployees();

  res.json(employees);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).json("Invalid body field provided.");
  }

  const employee = await createEmployee({ name, birthday, salary });

  res.status(201).json(employee);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The id must be a positive integer.");
  }

  const employee = await getEmployee(id);
  if (!employee) {
    return res.status(404).json("An employee with that id does not exist.");
  }

  res.status(200).json(employee);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The id must be a positive integer.");
  }

  const employee = await deleteEmployee(id);

  if (!employee) {
    return res.status(404).json("An employee with that id does not exist.");
  }

  res.status(204).json(employee);
});

router.put("/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The id must be a positive integer.");
  }

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) {
    return res.status(400).json("Invalid body field provided.");
  }

  const employee = await updateEmployee({ id, name, birthday, salary });

  if (!employee) {
    return res.status(404).json("An employee with that id does not exist.");
  }

  res.status(200).json(employee);
});

function isValidId(id) {
  const idNum = Number(id);

  return (
    /^\d+$/.test(id) &&
    !Number.isNaN(idNum) &&
    Number.isInteger(idNum) &&
    idNum >= 0
  );
}

export default router;

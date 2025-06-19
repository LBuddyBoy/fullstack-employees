import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const SQL = `
  INSERT INTO employees(name, birthday, salary) 
  VALUES($1, $2, $3)
  RETURNING *
  `;
  const params = [name, birthday, salary];

  const {
    rows: [employee],
  } = await db.query(SQL, params);

  return employee;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const SQL = `
  SELECT * FROM employees;
  `;
  const { rows } = await db.query(SQL);

  return rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const SQL = `
  SELECT * FROM employees WHERE id = $1;
  `;
  const {
    rows: [employee],
  } = await db.query(SQL, [id]);

  if (!employee) return undefined;

  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const SQL = `
    UPDATE employees
    SET name = $1, birthday = $2, salary = $3
    WHERE id = $4
    RETURNING *
  `;
  const params = [name, birthday, salary, id];

  const {
    rows: [employee],
  } = await db.query(SQL, params);

  return employee || undefined;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const SQL = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *;
  `;
  const params = [id];

  const {
    rows: [employee],
  } = await db.query(SQL, params);

  if (!employee) return undefined;

  return employee;
}

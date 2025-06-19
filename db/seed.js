import db from "#db/client";
import { Faker, es } from "@faker-js/faker";

const customFaker = new Faker({ locale: [es] });

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function createEmployee({ name, birthday, salary }) {
  const SQL = `
  INSERT INTO employees(name, birthday, salary) 
  VALUES($1, $2, $3)
  RETURNING *
  `;
  const params = [name, birthday, salary];

  const {
    rows: [employee]
  } = await db.query(SQL, params);

  console.log(employee);

  return employee;
}

async function seedEmployees() {
  const employees = [
    { name: "Ethan Toups", birthday: "2005-12-29", salary: 50000 },
  ];

  for (let index = 0; index < 9; index++) {
    const birthday = customFaker.date.past();
    const yyyyMmDd = birthday.toISOString().split("T")[0];

    const employee = {
      name: customFaker.person.firstName(),
      birthday: yyyyMmDd,
      salary: customFaker.number.int(10000, 50000),
    };

    employees.push(employee);
  }

  for (const index in employees) {
    const employee = employees[index];

    await createEmployee(employee);
  }
}

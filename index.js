const express = require("express");
const app = express();
const pool = require("./db");
const PORT = 443;

app.use(express.json()) // => req.body

// ROUTES //

// get all todos

app.get("/employees", async (req, res) => {
    console.log("----------------app.getall------------------")
    try {
        const employees = await pool.query("SELECT * FROM employees");

        console.table(employees.rows)
        res.json(employees.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get a todo

app.get("/employees/:id", async (req, res) => {
    console.log("----------------app.getbyid------------------")
    try {
        const { id } = req.params
        const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);

        console.table(employee.rows[0]);
        res.json(employee.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

// create a todo

app.post("/employees", async (req, res) => {
    console.log("----------------app.post------------------")
    try {
        const { id, name } = req.body;
        const employee = await pool.query("INSERT INTO employees VALUES ($1, $2) RETURNING *", [id, name]);

        console.table(employee);
        res.json(employee); // make json to client
    } catch (error) {
        console.error(error.message)
    }
})

// update a todo

app.put("/employees/:id", async (req, res) => {
    console.log("----------------app.put------------------")
    try {
        const { id } = req.params; // WHERE
        const { name } = req.body; // SET
        const employee = await pool.query("UPDATE employees SET name = $1 WHERE id = $2 RETURNING *", [name, id]);

        console.table(employee);
        res.json(employee);
    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo

app.delete("/employees/:id", async (req, res) => {
    console.log("----------------app.delete------------------")
    try {
        const { id } = req.params;
        const employee = await pool.query("DELETE FROM employees WHERE id = $1 RETURNING *", [id]);

        console.table(employee);
        res.json(employee);
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
})
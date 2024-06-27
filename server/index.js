import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/tasks.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("error in database connection");
  } else {
    console.log("database connection success");
  }
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/tasks", taskRoutes);

const port = 3001;

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "invalid input data" });
  }

  const checkEmail = "SELECT * FROM user WHERE email=?";
  db.query(checkEmail, [email], (err, data) => {
    if (err) {
      console.error("error checking email", err);
      return res.status(500).json({ error: "internal server error" });
    }

    if (data.length > 0) {
      return res
        .status(400)
        .json({ error: "user with this email already registered" });
    }

    const sqlInsert = "INSERT INTO user(name, email, password) VALUES(?, ?, ?)";
    db.query(sqlInsert, [name, email, password], (err, result) => {
      if (err) {
        console.error("error inserting data", err);
        return res.status(500).json({ error: "internal server error" });
      }

      res.status(200).send("data inserted successfully");
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      Status: "Error",
      Error: "Please enter both email and password",
    });
  }

  const sql = "SELECT * FROM user WHERE email=?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Error in database query", err);
      return res.json({ Error: "Internal server error" });
    }

    if (data.length > 0) {
      const user = data[0];
      if (password === user.password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "test",
          { expiresIn: "1h" }
        );
        return res.json({ Status: "Success", token });
      } else {
        return res.json({ Error: "Password not matched" });
      }
    } else {
      return res.json({ Error: "Email not existed" });
    }
  });
});

app.post("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const sql = "UPDATE tasks SET completed = ? WHERE id = ?";
  db.query(sql, [updatedTask.completed, id], (err, result) => {
    if (err) {
      console.error("Error updating task:", err);
      return res.status(500).json({ error: "Server error" });
    }
    return res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

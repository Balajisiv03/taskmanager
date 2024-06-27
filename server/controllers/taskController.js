// export const getAllTasks = (req, res) => {
//   const sql = "SELECT * FROM tasks";
//   req.db.query(sql, (err, result) => {
//     if (err) {
//       return res.json({ Message: "Server error" });
//     }
//     return res.json(result);
//   });
// };

export const getAllTasks = (req, res) => {
  const { completed } = req.query;
  let sql = "SELECT * FROM tasks";
  const params = [];

  if (completed !== undefined) {
    sql += " WHERE completed = ?";
    params.push(completed === "true" ? 1 : 0);
  }

  req.db.query(sql, params, (err, result) => {
    if (err) {
      return res.json({ Message: "Server error" });
    }
    return res.json(result);
  });
};

export const getTaskById = (req, res) => {
  const sql = "SELECT * FROM tasks WHERE id=?";
  const id = req.params.id;
  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);
  });
};

export const createTask = (req, res) => {
  const sql = "INSERT INTO tasks(`title`, `description`) VALUES (?)";
  const values = [req.body.title, req.body.description];
  req.db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json(result);
  });
};

export const updateTask = (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tasks SET `title`=?, `description`=? WHERE id=?";
  req.db.query(
    sql,
    [req.body.title, req.body.description, id],
    (err, result) => {
      if (err) {
        return res.json({ Message: "Error inside server" });
      }
      return res.json(result);
    }
  );
};

export const deleteTask = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tasks WHERE id=?";
  req.db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    return res.json(result);
  });
};

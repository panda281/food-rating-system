const express = require("express");
const router = express.Router();
const p = require("../index");
const pool = p.createconn;
const middleware = require('../middleware/authenticateToken').authenticateToken;

router.post("/adduser", middleware, async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
   
    const fname = req.body.fname;
    const lname = req.body.lname;


    const result = await connection.query(
      "INSERT INTO user(user_fname,user_lname) VALUES (?,?);",
      [fname,lname]
    );
    res.json(result[0].insertId);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});


router.put("/updateuser", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
      const fname = req.body.fname;
      const lname = req.body.lname;
    
      const result = await connection.query(
        "UPDATE user SET user_fname = ?, user_lname = ? WHERE user_id = ?",
        [fname, lname, email, user_id]

      );
      res.json(result[0].changedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });


  // router.get("/listall", async (req, res) => {
  //   const connection = await pool.getConnection((err, conn) => {
  //     if (err) {
  //       res.json(err);
  //     }
  //   });
  //   try {
  //     const result = await connection.query(
  //       "select * from student;"
  //     );
  //     res.json(result[0]);
  //   } catch (err) {
  //     res.json(err);
  //   } finally {
  //     connection.release();
  //   }
  // });

  // router.post("/search", async (req, res) => {
  //   const connection = await pool.getConnection((err, conn) => {
  //     if (err) {
  //       res.json(err);
  //     }
  //   });
  //   try {
  //     const id = req.body.id;
  //     const result = await connection.query(
  //       "select * from student where sid = ?;",
  //       [id]
  //     );
  //     res.json(result[0]);
  //   } catch (err) {
  //     res.json(err);
  //   } finally {
  //     connection.release();
  //   }
  // });

  router.delete("/deleteuser", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
      const result = await connection.query(
        "delete from user where user_id = ?;",
        [user_id]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

module.exports = router;

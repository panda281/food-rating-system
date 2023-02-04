const express = require("express");
const router = express.Router();
const p = require("../index");
const pool = p.createconn;
const middleware = require('../middleware/authenticateToken').authenticateToken;

router.post("/addrate",middleware, async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const rate_number = req.body.rate_number;
    const user_id = req.body.id;
    const post_id = req.body.post_id;

    const result = await connection.query(
      "INSERT INTO rate(rate_number,user_id,post_id) VALUES (?,?,?);",
      [rate_number, user_id, post_id]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});


router.put("/updaterate", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const rate_number = req.body.rate_number;
      const user_id = req.body.id;
      const post_id = req.body.post_id;
      const result = await connection.query(
        "UPDATE rate SET rate_number = ? WHERE user_id = ? and post_id = ?",
        [rate_number, user_id, post_id]

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

  router.post("/searchrate", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
      const post_id = req.body.post_id;
      const result = await connection.query(
        "call check_rating(?,?)",
        [user_id,post_id]
      );
      res.json(result[0][0][0].rate_number);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.delete("/deleterate", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
      const post_id = req.body.post_id;
      const result = await connection.query(
        "delete from rate where user_id = ? and post_id = ?;",
        [user_id,post_id]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

module.exports = router;

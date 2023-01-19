const express = require("express");
const router = express.Router();
const p = require("../index");
const pool = p.createconn;

router.post("/adduseraccountuser", async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user_type = 'user';
    const user_id = req.body.user_id;
   
    const result = await connection.query(
      "INSERT INTO useraccount(username,password,usertype,user_id) VALUES (?,?,?,?);",
      [username, password, user_type, user_id]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});
router.post("/adduseraccountadmin", async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user_type = 'admin';
    const admin_id = req.body.admin_id;

    const result = await connection.query(
      "INSERT INTO useraccount(username,password,usertype,admin_id) VALUES (?,?,?,?);",
      [username, password, user_type, admin_id]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});


router.put("/updateuseraccountuser", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const password = req.body.password;
      const user_id = req.body.user_id;
      const result = await connection.query(
        "UPDATE useraccount SET password = ? WHERE user_id = ?",
        [password,user_id]

      );
      res.json(result[0].changedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.put("/updateuseraccountadmin", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const password = req.body.password;
      const admin_id = req.body.admin_id;
      const result = await connection.query(
        "UPDATE useraccount SET password = ? WHERE admin_id = ?",
        [password,admin_id]

      );
      res.json(result[0].changedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });




  router.post("/checkforuser", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const username = req.body.username;
      const password = req.body.password;
      const result = await connection.query(
        "call check_useraccount_user(?,?)",
        [username, password]
      );
      res.json(result[0][0]);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.post("/checkforadmin", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const username = req.body.username;
      const password = req.body.password;
      const result = await connection.query(
        "call check_useraccount_admin(?,?);",
        [username, password]
      );
      res.json(result[0][0]);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.delete("/deleteuseraccountuser", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.user_id;
      const result = await connection.query(
        "delete from useraccount where user_id = ?;",
        [user_id]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.delete("/deleteuseraccountadmin", async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const admin_id = req.body.admin_id;
      const result = await connection.query(
        "delete from useraccount where admin_id = ?;",
        [admin_id]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

module.exports = router;

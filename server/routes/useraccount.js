const express = require("express");
const router = express.Router();
const p = require("../index");
const pool = p.createconn;
const middleware = require('../middleware/authenticateToken').authenticateToken
const jwt = require('jsonwebtoken');

router.post("/adduseraccountuser", middleware, async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user_type = 'user';
    const user_id = req.body.id;
   
    const result = await connection.query(
      "INSERT INTO useraccount(email,password,usertype,user_id) VALUES (?,?,?,?);",
      [email, password, user_type, user_id]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});
router.post("/adduseraccountadmin", middleware, async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user_type = 'admin';
    const admin_id = req.body.id;

    const result = await connection.query(
      "INSERT INTO useraccount(email,password,usertype,admin_id) VALUES (?,?,?,?);",
      [email, password, user_type, admin_id]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});


router.put("/updateuseraccountuser", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const password = req.body.password;
      const user_id = req.body.id;
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

  router.put("/updateuseraccountadmin", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const password = req.body.password;
      const admin_id = req.body.id;
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




  router.post("/checkforuser", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      var final;
      const email = req.body.email;
      const password = req.body.password;
      const result = await connection.query(
        "call check_useraccount_user(?,?)",
        [email, password]
      );

      if(result[0][0] == 0)
      {
        final = 0
      }
      else
      {
        const GeneratedToken = jwt.sign({id: result[0][0]}, 'e1e2cd540a72f8ffdd5590ce70e52710ac0f79db0d1b6cd742c33db20507d17ff57bfaeffd7421ec260f2852a0d39e8dc13b0c39f53a5894209fa96929389a3a');
        final = {Authorization: 'Bearer '+ GeneratedToken}

      }
      res.json(final);
   
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.post("/checkforadmin", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      var final;
      const email = req.body.email;
      const password = req.body.password;
      const result = await connection.query(
        "call check_useraccount_admin(?,?);",
        [email, password]
      );
      if(result[0][0] == 0)
      {
        final = 0
      }
      else
      {
        const GeneratedToken = jwt.sign({id: result[0][0]}, 'e1e2cd540a72f8ffdd5590ce70e52710ac0f79db0d1b6cd742c33db20507d17ff57bfaeffd7421ec260f2852a0d39e8dc13b0c39f53a5894209fa96929389a3a');
        final = {Authorization: 'Bearer '+ GeneratedToken}

      }
      res.json(final);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.delete("/deleteuseraccountuser", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
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

  router.delete("/deleteuseraccountadmin", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const admin_id = req.body.id;
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

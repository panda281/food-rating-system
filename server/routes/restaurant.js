const express = require("express");
const router = express.Router();
const p = require("../index");
const pool = p.createconn;
const path = require('path');
const multer = require('multer');
const middleware = require('../middleware/authenticateToken').authenticateToken;


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./images");
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({storage:storage});

router.post("/addrestaurant", middleware, upload.single("image"), async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {
    const restaurant_name = req.body.restaurant_name;
    const restaurant_location = req.body.restaurant_location;
    const restaurant_image = req.file.filename;
  

    const result = await connection.query(
      "INSERT INTO restaurant(restaurant_name,restaurant_location, restaurant_image) VALUES (?,?,?);",
      [restaurant_name,restaurant_location, restaurant_image]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});


router.put("/updaterestaurant", middleware, upload.single("image"), async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
        const restaurant_name = req.body.restaurant_name;
        const restaurant_location = req.body.restaurant_location;
        const restaurant_image = req.file.filename;

      const result = await connection.query(
        "UPDATE restaurant SET restaurant_location = ?, restaurant_image = ? WHERE restaurant_name = ?",
        [restaurant_location, restaurant_image, restaurant_name]

      );
      res.json(result[0].changedRows);
    } 
    catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });


  router.get("/listallrestaurant", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const result = await connection.query(
        "select * from restaurant;"
      );
  
      const updatedResult = result[0].map((val) => {
        if(val.restaurant_image){
            return {
                ...val,
                restaurant_image: 'http://localhost:5000/' + val.restaurant_image
            }
        }else{
            return val;
        }
    });
      res.json(updatedResult);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.post("/searchrestaurant", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const restaurant_name = req.body.restaurant_name;
      const result = await connection.query(
        "select * from restaurant where restaurant_name = ?;",
        [restaurant_name]
      );
      const updatedResult = result[0].map((val) => {
        if(val.restaurant_image){
            return {
                ...val,
                restaurant_image: 'http://localhost:5000/' + val.restaurant_image
            }
        }else{
            return val;
        }
    });
      res.json(updatedResult);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

  router.delete("/deleterestaurant", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const restaurant_name = req.body.restaurant_name;
      const result = await connection.query(
        "delete from restaurant where restaurant_name = ?;",
        [restaurant_name]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

module.exports = router;

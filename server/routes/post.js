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

router.post("/addpost",middleware,upload.single("image"), async (req, res) => {
  const connection = await pool.getConnection((err, conn) => {
    if (err) {
      res.json(err);
    }
  });
  try {

    const image = req.file.filename;
    const post_name = req.body.post_name;
    const description = req.body.description;
    const restaurant_name = req.body.restaurant_name;
  

    // res.json(fileUrl);
    const result = await connection.query(
      "INSERT INTO post(post_name,post_image,post_description,restaurant_name ) VALUES (?,?,?,?);",
      [post_name,image,description,restaurant_name]
    );
    res.json(result[0].affectedRows);
  } catch (err) {
    res.json(err);
  } finally {
    connection.release();
  }
});

// router.get("/", (req, res) => {
//   // const path = 'images/' + req.query.x;
//   const path = 'images/' + "1673834125131.png";
//   // console.log(path)
 
//   res.sendFile(path, {root: '.'});
// });


router.put("/updatepost",middleware, upload.single("image"), async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const post_id = req.body.post_id;
      const image = req.file.filename;
      const post_name = req.body.post_name;
      const description = req.body.description;
      const restaurant_name = req.body.restaurant_name;

      const result = await connection.query(
        "UPDATE post SET post_name = ?, post_image = ?, post_description = ?, restaurant_name = ? WHERE post_id = ?",
        [post_name, image, description, post_id, restaurant_name]

      );
      res.json(result[0].changedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

 

  router.get("/listallpost", middleware,async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const result = await connection.query(
        "call list_post_with_rating();"
      );

      const updatedResult = result[0][0].map((val) => {
        if(val.post_image){
            return {
                ...val,
                post_image: 'http://localhost:5000/' + val.post_image
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

  router.post("/favpost", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const user_id = req.body.id;
      const result = await connection.query(
        "select post.post_id, rate_number as rate, post_name, post_image, post_description,post_date, restaurant_name from  rate inner join post on rate.post_id = post.post_id and rate.user_id = ?;",
        [user_id]
      );

      const updatedResult = result[0].map((val) => {
        if(val.post_image){
            return {
                ...val,
                post_image: 'http://localhost:5000/' + val.post_image
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

  router.post("/searchpost", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const post_id = req.body.post_id;
      const result = await connection.query(
        "call current_post_with_ratings(?);",
        [post_id]
      );
      const updatedResult = result[0][0].map((val) => {
        if(val.post_image){
            return {
                ...val,
                post_image: 'http://localhost:5000/' + val.post_image
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

  router.delete("/deletepost", middleware, async (req, res) => {
    const connection = await pool.getConnection((err, conn) => {
      if (err) {
        res.json(err);
      }
    });
    try {
      const post_id = req.body.post_id;
      const result = await connection.query(
        "delete from post where post_id = ?;",
        [post_id]
      );
      res.json(result[0].affectedRows);
    } catch (err) {
      res.json(err);
    } finally {
      connection.release();
    }
  });

module.exports = router;

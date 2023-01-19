const config = require("./config/config");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const conn = mysql.createPool(config);
exports.createconn = conn;

app.use(cors());
app.use(express.json());
app.use(express.static('images'));


const post = require("./routes/post");
app.use("/post", post);

const admin = require("./routes/admin");
app.use("/admin", admin);

const user = require("./routes/user");
app.use("/user", user);

const rate = require("./routes/rate");
app.use("/rate", rate);

const useraccount = require("./routes/useraccount");
app.use("/useraccount", useraccount);

app.listen(5000,"127.0.0.1", () => {
  console.log("running on port 5000");
});

const express = require("express");
const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

require("./configs/database");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/logins", require("./src/pages/Users/usersLogin"));
app.use("/api/permissions", require("./src/pages/Users/permissions"));

app.listen(8000);

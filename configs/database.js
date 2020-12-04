const { json } = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/rosenflixDB");
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: String,
    pwd: String
})

module.exports = mongoose.model("logins", UserSchema);
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PermissionSchema = new Schema({
    userId: String,
    permissions: [String]
})

module.exports = mongoose.model("permissions", PermissionSchema);
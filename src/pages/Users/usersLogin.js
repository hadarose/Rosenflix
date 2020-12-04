const express = require("express");
const router = express.Router();

const User = require("../../shared/users-utils");

const { models } = require("mongoose");

router.route("/").get(function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.send(err);
    }
    return res.json(users);
  });
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;

  User.findById(id, function (err, user) {
    if (err) {
      return res.send(err);
    }

    return res.json(user);
  });
});

router.route("/").post(function (req, res) {
  const userLogin = new User({
    userName: req.body.userName,
    pwd: req.body.pwd,
  });

  userLogin.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send("User login details were added successfully!");
    }
  });
});

router.route("/:id").put(function (req, res) {
  let id = req.params.id;
  User.findByIdAndUpdate(
    id,
    {
      userName: req.body.userName,
      pwd: req.body.pwd,
    },
    function (err) {
      if (err) {
        return res.send(err);
      } else {
        return res.send("User login details were updated successfully!");
      }
    }
  );
});

router.route("/:id").delete(function (req, res) {
  let id = req.params.id;

  User.findByIdAndDelete(id, function (err) {
    if (err) {
      return res.send(err);
    } else {
      res.send("Deleted!");
    }
  });
});

module.exports = router;

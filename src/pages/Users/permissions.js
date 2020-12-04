const express = require("express");
const router = express.Router();

const Permission = require("../../shared/permissions-utils");

const { models } = require("mongoose");

router.route("/").get(function (req, res) {
  Permission.find({}, function (err, users) {
    if (err) {
      return res.send(err);
    }
    return res.json(users);
  });
});

router.route("/:id").get(function (req, res) {
  let id = req.params.id;

  Permission.findById(id, function (err, user) {
    if (err) {
      return res.send(err);
    }

    return res.json(user);
  });
});

router.route("/").post(function (req, res) {
  const permit = new Permission({
    userId: req.body.userId,
    permissions: req.body.permissions,
  });

  permit.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      return res.send("User permissions were added successfully!");
    }
  });
});

router.route("/:id").put(function (req, res) {
  let id = req.params.id;
  Permission.findByIdAndUpdate(
    id,
    {
      userId: req.body.userId,
      permissions: req.body.permissions,
    },
    function (err) {
      if (err) {
        return res.send(err);
      } else {
        return res.send("User permissions were updated successfully!");
      }
    }
  );
});

router.route("/:id").delete(function (req, res) {
  let id = req.params.id;

  Permission.findByIdAndDelete(id, function (err) {
    if (err) {
      return res.send(err);
    } else {
      res.send("Deleted!");
    }
  });
});

module.exports = router;

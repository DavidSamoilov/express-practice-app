const express = require("express");
const router = express.Router();
const Members = require("../../Members");

// Gets all members
router.get("/", (req, res) => res.json(Members));

// Get single member
router.get("/:id", (req, res) => {
  const found = Members.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(Members.find((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
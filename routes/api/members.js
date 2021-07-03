const express = require("express");
const uuid = require("uuid")
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
// Create Member
router.post("/",(req,res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  }
  if(!(newMember.name && newMember.email)){
    return res.status(400).json({msg:"Please include a name and email"})
  }
  Members.push(newMember);
  res.json(Members)

  res.send(req.body)
})

module.exports = router;
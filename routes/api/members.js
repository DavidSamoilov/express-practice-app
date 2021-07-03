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

// Update Member
router.put("/:id", (req, res) => {
  const found = Members.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    console.log(updMember);
    const member = Members.find(member => member.id === parseInt(req.params.id))
    if(member){
      member.name = updMember.name ? updMember.name : member.name;
      member.email = updMember.email ? updMember.email : member.email;
      res.json({msg:"Member updated",member})
    }
  }else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});


module.exports = router;
const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/alluser", authMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ error: "Error while fetching users" });
  }
});


router.get("/bulk", async (req, res) => {
  try {
    const nameFilter = req.query.filter || ""; 
    const users = await User.find({
      name: { $regex: nameFilter, $options: "i" }
    });

    res.status(200).json({
      users: users.map((user) => ({
        name: user.name,
        _id: user._id,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error("Error while fetching users with filter:", error);
    res.status(500).json({ error: "Error while fetching users with filter", details: error.message });
  }
});

module.exports = router;

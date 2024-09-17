const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route for fetching all users
router.get("/alluser", authMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ error: "Error while fetching Users" });
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
    res.status(500).json({ error: "Error while fetching Users with filter", details: error.message });
  }
});

module.exports = router;

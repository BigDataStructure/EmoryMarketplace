import express from "express";
import User from "../models/userModel.js";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserList,
  getUserListByUsername,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// router.get("/", getUserList);
// router.route("/").get(protect, getUserList);
router.route("/").post(registerUser);
router.get("/:username", getUserListByUsername);

//getting user info given userId
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", authUser);

router.put("/", async (req, res) => {
  if (req.body.username === req.params.id || req.body.isAdmin) {
  }
  try {
    const user = await User.updateOne(
      { username: req.body.username },
      {
        $set: req.body,
      }
    ).exec();
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
  // } else {
  //   return res.status(403).json("You can update only your account!");
  // }
});
export default router;

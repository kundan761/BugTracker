import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel";

const userRouter = express.Router();

// Register new user
userRouter.post("/register", async (req, res) => {
  const { name, avatar, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ err });
      } else {
        const user = new User({
          name,
          avatar,
          email,
          password: hash,
        });
        await user.save();
        res.status(200).json({ msg: "New user has been registered" });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// user login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log({name:user.name, email:user.email});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id, name: user.name }, 'masai');
        res.status(200).json({ token, user: { userID: user._id, name: user.name } });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default userRouter;

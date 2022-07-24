const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const User = require("../Models/User");

router.post("/createUser", async (req, res) => {
  try {
    const emailAlreadyRegister = await User.findOne({'email':req.body.email})
    if(emailAlreadyRegister){
      res.status(StatusCodes.FORBIDDEN).json({success:false, message:"Email already registered"})
    }
    const user = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    console.log(error);
  }
})

router.get("/getAllUserList", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users, counts: users.length });
  } catch (error) {
  console.log(error);
  }
});

router.put('/updateUser/:id', async (req, res) => {


  try {
    const { id: userId } = req.params
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!user) {
      return res.status(404).json({ msg: `No user with id :${userId}` })
    }else{
      res.status(200).json({ user })
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

router.delete('/deleteUser/:id', async (req, res) => {
    try {
      const { id: userId } = req.params
    const user = await User.findByIdAndRemove({ _id: userId })
    if (!user) {
      return res.status(404).json({ msg: `No user with id :${userId}` })
    }else{
      res.status(200).json({success:true, message:"Deleted Successfully"})
    }
    } catch (error) {
      console.log(error);
    }
})

module.exports = router;

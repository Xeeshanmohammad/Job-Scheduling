const express = require('express')
const router = express.Router()
const { StatusCodes } = require("http-status-codes");
const Worker = require('../Models/Worker')

router.post("/createWorker", async (req, res) => {
  try {
    const emailAlreadyRegister = await Worker.findOne({'email':req.body.email})
    if(emailAlreadyRegister){
      res.status(StatusCodes.FORBIDDEN).json({success:false, message:"Email already registered"})
    }
    const worker = await Worker.create(req.body)
    res.status(StatusCodes.CREATED).json({ worker })
  } catch (error) {
    console.log(error);
  }
})

router.get("/getAllWorkerList", async (req, res) => {
  try {
    const workers = await Worker.find({});
    res.status(StatusCodes.OK).json({ workers, counts: workers.length });
  } catch (error) {
  console.log(error);
  }
});

router.put('/updateWorker/:id', async (req, res) => {


  try {
    const { id: workerId } = req.params
    const worker = await Worker.findOneAndUpdate({ _id: workerId }, req.body, {
      new: true,
      runValidators: true
    })
    if (!worker) {
      return res.status(404).json({ msg: `No worker with id :${workerId}` })
    }else{
      res.status(200).json({ worker })
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

router.delete('/deleteWorker/:id', async (req, res) => {
    try {
      const { id: workerId } = req.params
    const worker = await Worker.findByIdAndRemove({ _id: workerId })
    if (!worker) {
      return res.status(404).json({ msg: `No worker with id :${workerId}` })
    }else{
      res.status(200).json({success:true, message:"Deleted Successfully"})
    }
    } catch (error) {
      console.log(error);
    }
})

module.exports = router;

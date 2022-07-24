
const mongoose = require('mongoose')
const bookedSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },

      workerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Worker',
        required: true,
      },

      workerScheduleId: {
        type: mongoose.Types.ObjectId,
        ref: 'workerSchedule',
        required: true,
      },

})

module.exports = mongoose.model('BookedWorker', bookedSchema)
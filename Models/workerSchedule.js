const mongoose = require('mongoose')
const scheduleSchema = new mongoose.Schema({
          day: {
            type: String,
            enum: ['Monday','Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'],
          },
          from: {
            type: Date,
          },
          to: {
            type: Date,
          },
          status: {
            type: Boolean,
            default: 'false',
          },
          workerId: {
            type: mongoose.Types.ObjectId,
            ref: 'Worker',
            required: true,
          }
          
        },
        { timestamps: true })
module.exports = mongoose.model('workerSchedule', scheduleSchema)


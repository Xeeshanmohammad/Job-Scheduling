const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
    }).then(()=>console.log('Connected to a databse---->>>>>>'))
    .catch((error)=>console.log('database is not connected', error));
}

module.exports = connectDB
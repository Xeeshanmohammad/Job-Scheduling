const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./Database/connect");
const bodyParser = require("body-parser");

//controller
const userRouter = require("./Controllers/User");
const workerRouter = require("./Controllers/worker");
const scheduleRouter = require('./Controllers/schedule')

//MiddleWare
const errorHandlerMiddleware = require('./Middleware/error-handler');
const notFound = require("./Middleware/not-found");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/worker", workerRouter);
app.use("/api/v1/schedule",scheduleRouter)

app.get("*", (req, res) => {
  res.send("JOBS - SCHEDULING");
});


app.post((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(notFound)
app.use(errorHandlerMiddleware)


const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(port, () =>
      console.log(`Server is listening on port : ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

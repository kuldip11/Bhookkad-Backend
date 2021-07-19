const express = require("express")
const app = express()
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router()
const port = 3000

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")

//Db Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    () => { console.log("DB Connected")}
).catch(
    () => { console.log("Db Not Connected")}
)

//Routes
app.use('/bhookkad',authRoute)
app.use('/bhookkad',userRoute)

//start server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
})
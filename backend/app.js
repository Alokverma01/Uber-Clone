const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./db/db');
const userRoutes = require("./routes/user.routes");
const cookieParser =  require('cookie-parser');
const captainRoutes = require("./routes/captain.routes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());    
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("hii api is working");
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const app = express()
const PORT =3500;


const hotelRouter = require("./routs/hotel.router");
const hotelDataAddedToDBRouter = require("./routs/dataimport.router");
const categoryDataAddedToDBRouter = require("./routs/categoryimport.router");
const singleHoterRouter = require("./routs/singlehotel.router");
const categoryRouter = require("./routs/category.router");
const authRouter = require("./routs/auth.router");
const wishlistRouter = require("./routs/wishlist.router");

const connectDB = require('./config/dbconfig');

app.use(express.json());
connectDB();


app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHoterRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);


app.get('/', function (req, res) {
  res.send('Hello World')
})

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || PORT, () => {
    console.log("Server is Up and Running");
  });
});
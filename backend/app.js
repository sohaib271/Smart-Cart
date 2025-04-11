const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const BuyerRouter=require("./routes/buyer");
const mongoose=require("mongoose");
const CustomerSupport=require("./routes/customersupport");
const CartRouter=require("./routes/cart");
const ReviewRouter=require("./routes/review");
const ProductRouter=require("./routes/product")
const OrderRouter=require("./routes/order")

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("Database Connected"));

const app=express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,}))
app.use(bodyParser.json());

app.use("/user",BuyerRouter);
app.use("/product",ProductRouter);
app.use("/order",OrderRouter);
app.use("/",CustomerSupport);
app.use("/cart",CartRouter);
app.use("/review",ReviewRouter);


const Port=process.env.PORT || 8000;
app.listen(Port,()=>console.log("Server Started"));
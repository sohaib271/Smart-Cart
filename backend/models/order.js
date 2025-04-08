const {Schema,model}=require("mongoose");

const OrderSchema=new Schema({
  orderTitle:{
    required:true,
    type:String
  },
  buyerName:{
    type:String,
    required:true,
  },
  productIdNumber:{
     type:Schema.Types.ObjectId,
    ref:"Products"
  },
  buyerEmail:{
    type:String,
    required:true
  },
  sellerName:{
    type:String,
    required:true,
  },
  sellerEmail:{
    type:String,
    required:true,
  },
  orderedFrom:{
    type:String,
    required:true,
  },
  orderStatus:{
    type:String,
    enum:["waiting","shipped","delivered"],
    default:"waiting"
  },
  buyerId:{
     type:Schema.Types.ObjectId,
    ref:"Users"
  },
  deliveryAddress:{
    type:String,
    required:true
  },
  orderPrice:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  size:{
    type:String,
  },
  buyerPhoneNo:{
    type:String,
    required:true
  }
},{timestamps:true});

const Order=new model("Orders",OrderSchema);

module.exports=Order;
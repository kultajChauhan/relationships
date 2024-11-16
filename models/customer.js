const mongoose=require('mongoose');

main().then(()=>{console.log("dataBase connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let orderSchema= new mongoose.Schema({
    item:String,
   price:Number
})

let customerSchema= new mongoose.Schema({
    name:String,
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ]
})

let orderModel=new mongoose.model('order',orderSchema);
let customerModel=new mongoose.model('customer',customerSchema);

let addCustomer= async ()=>{
    let cust1= new customerModel({
        name:"kultaj"
    });
    let order1=await orderModel.findOne({item:'chips'});
    let order2=await orderModel.findOne({item:'choclate'});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let custRes=await cust1.save();
    console.log(custRes);
}
addCustomer();

// const orders=async ()=>{
//    let res=await orderModel.insertMany([
//         {item:'samosa',price:12},
//         {item:'chips', price:10},
//         {item:"choclate",price:20}
//     ])

//     console.log(res);
// }

// orders();
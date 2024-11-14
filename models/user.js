const mongoose=require('mongoose');

main().then(()=>{console.log("dataBase connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let userSchema= new mongoose.Schema({
    userName:String,
    addresses:[{_id:false,location:String,
        city:String
    }]
})

let userModel=new mongoose.model("users",userSchema);

let userData=async ()=>{
let user1=new userModel({
    userName:"abc",
    addresses:[{location:"delhi",city:"delhi"}]
});

user1.addresses.push({location:"mumbai",city:"mumbai"});
let result=await user1.save();
console.log(result);
}

userData();
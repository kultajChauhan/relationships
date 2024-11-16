const mongoose=require('mongoose');

main().then(()=>{console.log("dataBase connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let userSchema= new mongoose.Schema({
    userName:String,
    email:String
});

let postSchema= new mongoose.Schema({
    content:String,
    like:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
});

const userModel=new mongoose.model("user",userSchema);
const postModel=new mongoose.model("post",postSchema);

// let addData = async()=>{
    // let user1 = new userModel({
    //     userName:"kultaj",
    //     email:"abc@gmail.com"
    // });

// let user= await userModel.findOne({userName:"kultaj"})

//     let post1= new postModel({
//         content:"Bye Bye ;)",
//         likes:"1000"
//     });

//     post1.user=user;
//     await post1.save()
// }

// addData();

let showData= async()=>{
    let post =await postModel.find({}).populate("user",'userName');
    console.log(post);
}

showData();
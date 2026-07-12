const mongoose =require("mongoose");

async function connectDB(){
    await mongoose.connect('mongodb+srv://hrydam:Qwopaskl@backend-full.6sdmgdj.mongodb.net/hally')



    console.log("connected to DB")
}

module.exports=connectDB





//working of mongoose is to connect the server to the database
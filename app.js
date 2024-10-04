const express  = require('express')
require("dotenv").config()
const os = require('os')
const redis = require('redis')
const redisUrl ='redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
const mongoose =require('mongoose')
require("./db/db")
const app =express()
app.use(express.json())

console.log(os.cpus().length);

const crypto =require('crypto')
const User = require('./model/user')
const Product = require('./model/product')
const { kMaxLength } = require('buffer')
const start =Date.now()
console.log(start);

 client.connect()
// const chahedData = client.get("name", id)
// if(chahedData){
//     console.log(/dffe/);
//      console.log(chahedData);
//       chahedData.then((ress)=>console.log(ress))
// }else{
//     console.log(/..../);
//     const data = client.set("userName","Amit")
// }

app.get("/value/:id",async (req,res)=>{
   try {
        const id = req.params.id
        console.log(id);
        const chahedData =await client.get(`id:${id}`,id)
        console.log(/chahedData/,chahedData);
        if(chahedData !=null){ 
            const data = JSON.parse(chahedData)
            const result =  Object.assign({},data)
            console.log(/result/,result);
           return res.send({data})
        }
        const data = await User.findOne({_id:id})
        console.log(data);
       const setData= await client.set(`id:${id}`,JSON.stringify(data),'EX',5)
      
        return  res.send({message:"plz reload again"})
   } catch (error) {
    console.log(error);
   }
})


function dowork(duration){
    const time =Date.now()
    console.log(Date.now()-time<duration);
    while( Date.now()-time<duration) {
    }
    
    // setTimeout(()=>{ 
    //     console.log('wokrk goes on')
    // },duration)
}

async function weather(){
  const data =await   setTimeout(()=>{
        console.log('weather: '+ 34);
    },3000)

}
 weather()
console.log(/reach hrere/);
// app.get('/',(req,res)=>{
//     dowork(5000)
//     res.send("hello")
//     console.log('hello');
// })

app.post("/createProduct",async(req,res)=>{
    try {
        console.log(/createProduct/);
        const data = await Product.create({
            product_name:req.body.productName,
            price:req.body.price,
            qty:req.body.qty,
            user_id:req.body.userId
        })
        await data.save()
        // console.log(/data/,data);
        return res.json({message:"product store successfully"})
    } catch (error) {
        console.log(error);
    }
})

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('1:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('2:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('3:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('4:',Date.now()-start);
// })
// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('5:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('6:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('7:',Date.now()-start);
// })
// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('8:',Date.now()-start);
// })
// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('9:',Date.now()-start);
// })

// crypto.pbkdf2('a','b',1000,123,'sha512',()=>{
//     console.log('10:',Date.now()-start);
// })

// app.get("/:id", async(req,res)=>{
//     try{
//         const productChahedData =await client.get(`id:${req.params.id}`)
//         console.log(/productChahedData/,JSON.parse(productChahedData));
//         const productData = await Product.find({_id:req.params.id}).populate({path:'user',strictPopulate:false})
//         console.log(/productData/,productData);
//         // const userData = await User.findOne({_id:productData[0].user_id})
//         // const result  = {userData,productData}
//         if(!productChahedData){
//             await client.set(`id:${req.params.id}`,JSON.stringify(productData))
//         return res.send(productData) 
//         }
//         return  res.send(JSON.parse(productChahedData))
//         // const setData= await client.set(`id:${id}`,JSON.stringify(data),'EX',5)

//     }catch(error){
//         console.log(error);
//     }
// })


app.get("/pagination",async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) ||5
        
        const userList  = await User.find().skip((page-1)*limit).limit(limit).sort({_id:-1})
        return res.json(userList)
    } catch (error) {
        console.log(error);
    }
})
myDate = "2023-12-14" 
console.log( /icieiniefni/,new Date(myDate).getMonth());
app.listen(2000,()=>{
    console.log('server is up on the port 2000');
})


const calculateAge = (birthDate)=>{
    let todayDate = new Date()
    birthDate = new Date(birthDate)    
    let age = todayDate.getFullYear() - birthDate.getFullYear()
    console.log(age);

    let mothDiff = todayDate.getMonth() - birthDate.getMonth()
     
    if(mothDiff <= 0 && todayDate.getDate() < birthDate.getDate() ){
        age--
    }
    console.log(age);
    return age
}

calculateAge('1990-05-06')


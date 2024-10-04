
const mongoose =require('mongoose')

mongoose.connect(process.env.DB).then(()=>
console.log('db connected successfully')).catch((error)=>console.log(error))
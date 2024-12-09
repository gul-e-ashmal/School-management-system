require('dotenv').config({ path: './config/.env' });
const express=require("express")
const connection=require("./config/db");


const app=express();


connection();

app.listen(process.env.PORT,()=>{
    console.log(`listening at port  ${process.env.PORT}`)
})
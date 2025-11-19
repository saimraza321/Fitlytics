// const express = require('express')
import express from 'express'
import path from 'path'
// import productRouter from './routes/productRoutes.mjs'
import fs from 'node:fs'
// const mongoose = require('mongoose');
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.mjs'
import cors from 'cors';

dotenv.config();


// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

// let products = data.products

const app = express()
const port = 3000
app.use(express.json());
app.use(cors());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://owaisahmedkhan:owais123@cluster0.mbgw7ps.mongodb.net/Perfumes');

  console.log("MongoDb Connected Successfully");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use("/user",userRouter)

app.listen(port, () => {
  console.log(`Sever listening on port ${port}`)
})

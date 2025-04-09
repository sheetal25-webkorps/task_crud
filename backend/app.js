const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const productRoutes = require('./routes/product.routes')
require('dotenv').config()

const app=express();
connectDB();
const corsOptions={
    origin:'*',
    credentials:true
}
app.use(cors(corsOptions));

app.use(express.json())
app.use('/api/products',productRoutes);

module.exports=app;
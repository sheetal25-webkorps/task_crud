const Product = require('../models/product.models');

exports.createProduct = async (data)=>{
    return await Product.create(data);
}

exports.getAllProduct = async ()=>{
    return await Product.find();
}

exports.getByIdProduct = async (id)=>{
    return await Product.findById(id);
}

exports.updateByIdProduct = async (id,updateData)=>{
    return await Product.findByIdAndUpdate(id,updateData,{new:true});
}

exports.deleteByIdProduct = async (id)=>{
    return await Product.findByIdAndDelete(id);
}
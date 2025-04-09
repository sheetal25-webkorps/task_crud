const productService = require('../services/product.service');

const create = async (req,res)=>{
    try{
       const product = await productService.createProduct(req.body);
       res.status(201).json(product);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
}

const getAll = async (req,res)=>{
    try{
       const products = await productService.getAllProduct();
       res.status(200).json(products);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
}

const getById = async (req,res)=>{
    try{
        const {id} = req.params;
       const product = await productService.getByIdProduct(id);
       res.status(200).json(product);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
}

const updateById = async (req,res)=>{
    try{
        const {id} = req.params;
        const updateData = req.body;
        const updatedProduct = await productService.updateByIdProduct(id,updateData);
        if(!updatedProduct){
            return res.status(404).json({message:"Product not found"})
        }
     
       res.status(200).json(updatedProduct);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
}

const deleteById = async (req,res)=>{
    try{
        const {id} = req.params;
       const product = await productService.deleteByIdProduct(id);
       res.status(200).json({message:"Deleted Successfully"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = {create,getAll,getById,updateById,deleteById}
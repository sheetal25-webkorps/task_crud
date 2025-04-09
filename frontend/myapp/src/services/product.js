import axios from "axios";
import APIENDPOINTS from '../api/product'

export const createProduct = async (data)=>{
try{
 const response = await axios.post(APIENDPOINTS.CREATE_PRODUCT(),data,{
    headers:{
     'Content-Type':'application/json',
    },
 });
 return response;
}
catch(error){
    console.log("Error creating product",error);
    throw error;
}
}

export const getAllProducts = async () => {
    try {
      const response = await axios.get(APIENDPOINTS.GETALL_PRODUCTS());
      return response?.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };


  export const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(APIENDPOINTS.DELETE_PRODUCT(id));
      return response;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
  
  export const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(APIENDPOINTS.UPDATE_PRODUCT(id), updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  
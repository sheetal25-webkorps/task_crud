const BASE_URL=process.env.REACT_APP_BASE_URL;
console.log(BASE_URL,"BASE_URL");
console.log(process.env); 

const APIENDPOINTS={
CREATE_PRODUCT:()=>`${BASE_URL}/products/add-product`,
GETALL_PRODUCTS:()=>`${BASE_URL}/products/getall-product`,

  DELETE_PRODUCT: (id) => `${BASE_URL}/products/delete-product/${id}`,
  UPDATE_PRODUCT: (id) => `${BASE_URL}/products/update-product/${id}`
};
export default APIENDPOINTS;


import React, { useState } from "react";
import '../../css/style.css'
import { createProduct } from "../../services/product";
function AddProduct({ show, onClose,onSucces }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({name:"",description:""});
    const [successMessage, setSuccessMessage] = useState('');
    const handleSubmit = async () => {
        try {
            const payload = {
                name: data.name,
                description: data.description
            };
    
            const response = await createProduct(payload);
            console.log(response?.data, "response");
    
            if (response?.status === 201) {
                console.log("1");
                setSuccessMessage("Product Created Successfully");
                setErrorMessage('');
                setData({ name: "", description: "" });
    
                if (onSucces) {
                    onSucces();
                }
    
                setTimeout(() => onClose(false), 2000);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage("Error while creating product");
            setSuccessMessage('');
        }
    };
    
    const handleChange =(e)=>{
    const {id,value}=e.target;
    setData(prevData=>({...prevData,[id]:value}))
    }
    if (!show) return null;
    return (
        <>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-modal="true" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add Product</h5>
                        
                        </div>
                        <div className="modal-body">
                        {errorMessage && (
                                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                                )}
                                {successMessage && (
                                    <div className="alert alert-success" role="alert">{successMessage}</div>
                                )}
                            <form>
                                <div className="mb-3">
                                    <label for="name" className="col-form-label">Name:</label>
                                    <input type="text" className="form-control" id="name" value={data.name} onChange={(e)=>handleChange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="col-form-label">Description:</label>
                                    <textarea className="form-control" id="description" value={data.description} onChange={(e)=>handleChange(e)}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => onClose(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AddProduct;
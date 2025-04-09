import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { updateProduct } from "../../services/product";

function EditProduct({ show, onClose, onSuccess, product }) {
  const [data, setData] = useState({ name: "", description: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (product) {
      setData({ name: product.name || "", description: product.description || "" });
    }
  }, [product]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updateProduct(product._id, data);
      console.log(response?.data, "Updated product");

      if (response?.status === 200) {
        setSuccessMessage("Product Updated Successfully");
        setErrorMessage('');

        if (onSuccess) {
          onSuccess();
        }

        setTimeout(() => onClose(false), 2000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error while updating product");
      setSuccessMessage('');
    }
  };

  if (!show || !product) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
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
                <label htmlFor="name" className="col-form-label">Name:</label>
                <input type="text" className="form-control" id="name" value={data.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="col-form-label">Description:</label>
                <textarea className="form-control" id="description" value={data.description} onChange={handleChange}></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => onClose(false)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;

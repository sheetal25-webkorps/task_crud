import React, { useEffect, useState } from "react";
import '../../css/style.css'
import { getAllProducts, deleteProduct } from "../../services/product";
import moment from "moment";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function ListProduct() {
    const [data, setData] = useState([]);
    const [addModel, setAddModel] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [editModel, setEditModel] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchDetails = async () => {
        try {
            setErrorMessage("");
            const response = await getAllProducts();
            console.log(response, "response");
            setData(response);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error while fetching");
        }
    };

    const handleButton = () => {
        setAddModel(true);
    };
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditModel(true);
    };


    const handleDelete = (id) => {
        setSelectedProductId(id);
        setDeleteModel(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(selectedProductId);
            setDeleteModel(false);
            setSelectedProductId(null);
            fetchDetails();
        } catch (error) {
            console.error("Delete error", error);
            setErrorMessage("Error deleting product.");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <>
            <div className="container mt-4">
                <div className="card p-4">
                    <div className="d-flex justify-content-between">
                        <h2 className="card-title">Product List</h2>
                        <button className="btn btn text-primary" onClick={handleButton}>
                            <i className="bi bi-plus"></i> Add
                        </button>
                    </div>

                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">{errorMessage}</div>
                    )}

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.description}</td>
                                    <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>
                                        <button type="button" className="btn m-0 p-0 text-success" onClick={() => handleEdit(item)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>

                                        <button
                                            type="button"
                                            className="btn m-0 p-1 text-danger"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {addModel && (
                    <AddProduct show={addModel} onClose={() => setAddModel(false)} onSucces={fetchDetails} />
                )}
                {editModel && selectedProduct && (
                    <EditProduct
                        show={editModel}
                        onClose={() => setEditModel(false)}
                        onSuccess={fetchDetails}
                        product={selectedProduct}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {deleteModel && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button type="button" className="close btn" onClick={() => setDeleteModel(false)}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this product?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setDeleteModel(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ListProduct;

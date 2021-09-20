import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Gestion des articles"
            description="Effectuer les modifications sur les articles"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total: {products.length} articles
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center btn-toolbar">
                                <strong>{p.name}</strong>
                                <div className="btn-toolbar">
                                    <button className="btn btn-inverse">
                                        <a className="badge badge-warning badge-pill text-decoration-none" href={`/admin/product/update/${p._id}`}>
                                            Mettre à jour
                                        </a>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a href="#"></a>
                                        </li>
                                        <li>
                                            <a href="#"></a>
                                        </li>
                                    </ul>
                                    <button className="btn btn-inverse" onClick={() => destroy(p._id)} >
                                        <a className="badge badge-danger badge-pill text-white">
                                            Supprimer
                                        </a>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;

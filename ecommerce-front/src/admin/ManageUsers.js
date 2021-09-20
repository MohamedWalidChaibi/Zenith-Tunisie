import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "./apiAdmin";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();

    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const destroy = userId => {
        deleteUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadUsers();
            }
        });
    };


    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Layout
            title="Gestion des utilisateurs"
            description="Effectuer les modifications sur les informations des utilisateurs"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total: {users.length} utilisateurs
                    </h2>
                    <hr />
                    <ul className="list-group">
                        {users.map((u, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{u.name}</strong>
                                <div className="btn-toolbar">
                                    <button className="btn btn-inverse">
                                
                                    <a className="badge badge-warning badge-pill text-decoration-none" href={`/admin/user/update/${u._id}`}>
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
                                <button className="btn btn-inverse" onClick={() => destroy(u._id)} > 
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

export default ManageUsers;

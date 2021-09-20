import React from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

const AdminDashboard = () => {

	const {user: {_id, name, email, phone, address, role}} = isAuthenticated();
	console.log({user: {_id, name, email, phone, address, role}});
	const adminLinks = () =>{
		return (
			<div className="card mb-5">
				<h4 className="card-header">Liens Administrateur</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/create/category">Création de catégorie</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/create/product">Création d'article</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/orders">Voir les commandes</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/products">Gestion des articles</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/admin/users">Gestion des utilisateurs</Link>
					</li>

				</ul>
			</div>
		);
	};

	const adminInfo = () => {
		return (
			<div className="card mb-5">
				<h3 className="card-header">Information</h3>
				<ul className="list-group">
					<li className="list-group-item">Nom: {name}</li>
					<li className="list-group-item">E-mail: {email}</li>
					<li className="list-group-item">Téléphone: {phone}</li>
					<li className="list-group-item">Adresse: {address}</li>
					<li className="list-group-item">{role === 1 ? "Administrateur" : "Utilisateur enregistré"}</li>
				</ul>
			</div>
		)
	}

	return (
		<Layout title="Tableau de bord" description={`Bonjour ${name} !`} className="container-fluid">
			
			<div className="row">
				<div className="col-3">
					{adminLinks()}
				</div>

				<div className="col-9">
					{adminInfo()}
				</div>
			</div>
			
		</Layout>
	);

};

export default AdminDashboard;
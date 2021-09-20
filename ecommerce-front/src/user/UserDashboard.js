import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {getPurchaseHistory} from "./apiUser"
import moment from 'moment';
import Footer from "../core/Footer"

const Dashboard = () => {
	const [history, setHistory] = useState([])

	const {user: {_id, name, email, role, phone, address}} = isAuthenticated();

	const token = isAuthenticated().token

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setHistory(data)
			}
		})
	}

	useEffect(() => {
		init(_id, token)
	}, [])

	const userLinks = () =>{
		return (
			<div className="card mb-5">
				<h4 className="card-header">Liens Utilisateur</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart">Mon Panier</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to={`/profile/${_id}`}>Modifier le profil</Link>
					</li>
				</ul>
			</div>
		);
	};

	const userInfo = () => {
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

	const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Historique d'achat</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Nom de l'article: {p.name}</h6>
                                            <h6>Prix de l'article: {p.price} TND</h6>
                                            <h6>
                                                Date d'achat:{" "}
                                                {moment(p.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    	);
	};	

	return (
		<Layout title="Tableau de bord" description={`Bonjour ${name} !`} className="container-fluid">
			
			<div className="row">
				<div className="col-3">
					{userLinks()}
				</div>

				<div className="col-9">
					{userInfo()}
					{purchaseHistory(history)}
				</div>
			</div>
			{Footer()}
		</Layout>
	);

};

export default Dashboard;
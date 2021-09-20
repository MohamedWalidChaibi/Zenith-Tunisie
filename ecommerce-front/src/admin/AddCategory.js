import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";
import {createCategory} from "./apiAdmin";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const[success, setSuccess] = useState(false);

	// déstructurer l'utilisateur et le jeton du stockage local
	const {user, token} = isAuthenticated();

	const handleChange = (e) => {
		setError("")
		setName(e.target.value)
	}

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		// envoyer une requete à l'api pour créer une catégorie
		createCategory(user._id, token, {name})
		.then(data => {
			if(data.error) {
				setError(true)
			} else {
				setError("");
				setSuccess(true);
			}
		})
	}

	const newCategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">Nom</label>
				<input type="text" className="form-control"onChange={handleChange} value={name} autoFocus required/>		
			</div>
			<button className="btn btn-outline-primary">Création de catégorie</button>
		</form>
	);

	const showSuccess = () => {
		if(success) {
			return <h3 className="text-success">{name} est créé</h3>
		}
	}

	const showError = () => {
		if(error) {
			return <h3 className="text-danger">La catégorie doit être unique!</h3>
		}
	}

	const goBack = () => (
		<div className="mt-5">
			<Link to="/admin/dashboard" className="text-warning">Retour</Link>
		</div>
	)

	return (
		<Layout title="Ajouter une nouvelle catégorie" description={`Bonjour ${user.name}, êtes vous prêt pour l'ajout d'une nouvelle catégorie ?`}>
			
			<div className="row">
				<div className="col-md-8 offset-md-2">{showError()} {showSuccess()} {newCategoryForm()} {goBack()}</div>
			</div>
			
		</Layout>
	);
};

export default AddCategory;
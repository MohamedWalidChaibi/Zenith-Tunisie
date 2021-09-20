import React, {useState} from "react";
import {Link} from "react-router-dom";
import Layout from "../core/Layout";
import {signup} from "../auth";
import Footer from "../core/Footer"


const Signup = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		error: "",
		success: false
	});

	const {name, email, password, phone, address, success, error} = values

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};
	

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({...values, error: false})
		signup({name, email, password, phone, address})
		.then(data => {
			if(data.error) {
				setValues({...values, error: data.error, succes: false})
			} else
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					phone: "",
					address: "",
					error: "",
					success: true
				})
		})
	};

	const signUpForm = () => (
		<form>

			<div className="form-group">
				<label className="text-muted">Nom et Prénom</label>
				<input onChange={handleChange("name")} type="text" className="form-control" value={name}/>
			</div>

			<div className="form-group">
				<label className="text-muted">E-mail</label>
				<input onChange={handleChange("email")} type="email" className="form-control" value={email}/>
			</div>

			<div className="form-group">
				<label className="text-muted">Mot de passe</label>
				<input onChange={handleChange("password")} type="password" className="form-control" value={password}/>
			</div>

			<div className="form-group">
				<label className="text-muted">Téléphone</label>
				<input onChange={handleChange("phone")} type="number" className="form-control" value={phone}/>
			</div>

			<div className="form-group">
				<label className="text-muted">Adresse</label>
				<input onChange={handleChange("address")} type="text" className="form-control" value={address}/>
			</div>

			<button onClick={clickSubmit} className="btn btn-primary">Soumettre</button>
		</form>
	);

	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{display: success ? "" : "none"}}>
			Nouveau compte créé! Veuillez <Link to="/signin">vous connecter</Link>
		</div>
	);

	return (
		<Layout title="Inscription" description="Inscrivez-vous à Zenith" className="container col-md-8 offset-md-2">
			{showSuccess()}
			{showError()}
			{signUpForm()}
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			{Footer()}
		</Layout>
	);
};

export default Signup;
import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import {read, update, updateUser} from "./apiUser"
import Footer from "../core/Footer"


const Profile = ({match}) => {
	const [values, setValues] =useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		address: "",
		error: false,
		success: false
	})

	const {token} = isAuthenticated();

	const {name, email, password, phone, address, error, success} = values;


	const init = (userId) => {
		// console.log(userId)
		read(userId, token).then(data => {
			if(data.error) {
				setValues({...values, error: true})
			} else {
				setValues({...values,
					name: data.name,
					email: data.email,
					phone: data.phone,
					address: data.address
				})
			}
		})
	}

	useEffect(() => {
		init(match.params.userId)
	}, [])

	const handleChange = name => e => {
		setValues({...values, error: false, [name]: e.target.value})
	}

	const clickSubmit = (e) => {
		e.preventDefault();
		update(match.params.userId, token, {name, email, password, phone, address}).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				updateUser(data, () => {
					setValues({...values, 
						name: data.name, 
						email: data.email,
						phone: data.phone,
						address: data.address,
						success: true
					})
				})
			}
		})
	}

	const redirectUser = (success) => {
		if(success) {
			return <Redirect to="/cart"/>
		}
	}

	const profileUpdate = (name, email, password, phone, address) => (
		<form>

			<div className="form-group">
				<label className="text-muted">Nom</label>
				<input type="text" onChange={handleChange("name")} className="form-control" value={name}/>
			</div>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input type="email" onChange={handleChange("email")} className="form-control" value={email}/>
			</div>
			<div className="form-group">
				<label className="text-muted">Mot de passe</label>
				<input type="password" onChange={handleChange("password")} className="form-control" value={password}/>
			</div>
			<div className="form-group">
				<label className="text-muted">Téléphone</label>
				<input type="number" onChange={handleChange("phone")} className="form-control" value={phone}/>
			</div>
			<div className="form-group">
				<label className="text-muted">Adresse</label>
				<input type="text" onChange={handleChange("address")} className="form-control" value={address}/>
			</div>
			<br/>
			<button onClick={clickSubmit} className="btn btn-primary">Soumettre</button>
		</form>
	)

	return (
	<Layout title="Profil" description="Mettre à jour votre profil" className="container-fluid">
		<h2 className="mb-4">Mise à jour du profil</h2>
		{profileUpdate(name, email, password, phone, address)}
		{redirectUser(success)}
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


export default Profile;
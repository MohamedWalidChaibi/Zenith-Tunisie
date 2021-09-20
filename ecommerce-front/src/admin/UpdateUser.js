import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import {Link, Redirect} from "react-router-dom";
import { getUser, adminUpdate, adminUpdateUser } from "./apiAdmin";


const UpdateUser = ({match}) => {
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

	const {name, email, password, phone, role, address, error, success} = values;


	const init = (userId) => {
		// console.log(userId)
		getUser(userId).then(data => {
			if(data.error) {
				setValues({...values, error: true})
			} else {
				setValues({...values,
					name: data.name,
					email: data.email,
					role: data.role,
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
		adminUpdate(match.params.userId, token, {name, email, password, phone, address}).then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				adminUpdateUser(data, () => {
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
			return <Redirect to="/admin/dashboard"/>
		}
	}

	const profileUpdate = (name, email, password) => (
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
			<div className="form-group">
                <label className="text-muted">Role</label>
                <select
                    onChange={handleChange("role")}
                    className="form-control"
                >
                    <option value="0">Utilisateur</option>
                    <option value="1">Administrateur</option>
                </select>
            </div>
			<br/>
			<button onClick={clickSubmit} className="btn btn-primary">Soumettre</button>
		</form>
	)

	return (
	<Layout title="Profil Utilisateur" description="Mettre à jour les informations de l'utilisateur" className="container-fluid">
		<h2 className="mb-4">Mise à jour du profil</h2>
		{profileUpdate(name, email, password, phone, address)}
		{redirectUser(success)}
		<br/>
		<br/>
	</Layout>
	);

};


export default UpdateUser;
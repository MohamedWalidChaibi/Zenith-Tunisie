import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProducts, getBraintreeClientToken, processPayment, createOrder} from "./apiCore";
import {emptyCart} from "./cartHelpers"
import Card from "./Card";
import {isAuthenticated} from "../auth"
import {Link} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react"


const Checkout = ({products, setRun = f => f, run = undefined}) => {
	const [data, setData] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {},
		address: ""
	})

	const userId = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (userId, token) => {
		getBraintreeClientToken(userId, token).then(data => {
			if(data.error) {
				setData({...data, error: data.error})
			} else {
				setData({clientToken: data.clientToken})
			}
		})
	}

	useEffect(() => {
		getToken(userId, token)
	}, []);

	const handleAddress = event => {
		setData({...data, address: event.target.value})
	}

	const getTotal = () => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0)
	};

	const showCheckout = () => {
		return isAuthenticated() ? (
				<div>{showDropIn()}</div>
			) : (
				<Link to="/signin">
					<button className="btn btn-primary">Connexion</button>
				</Link>
			)
	};

	let deliveryAddress = data.address;

	const buy = () => {
		setData({loading: true})
		// envoyer le nonce au serveur
		// nonce = data.instance.requestPaymentMethod()
		let nonce;
		let getNonce = data.instance
			.requestPaymentMethod()
			.then(data => {
			// console.log(data)
			nonce = data.nonce
			// une fois que vous avez non (dart type, card number) senc nonce comme 'paymentMethodNonce'
			// et total pour être chargeur
			// console.log("envoyer le nonce et le total à traiter", nonce, getTotal(products))
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getTotal(products)
			}

			processPayment(userId, token, paymentData)
			.then(response => {
				console.log(response)
				
				// panier vide
				// créer une commande

				const createOrderData = {
					products: products,
					transaction_id: response.transaction.id,
					amount: response.transaction.amount,
					address: deliveryAddress
				}

				createOrder(userId, token, createOrderData)
				.then(response => {
					setRun(!run);
					emptyCart(() => {
					console.log("payment success and empty cart");
					setData({loading: false, success: true})
					})
				})
				.catch(error => {
				console.log(error)
				setData({loading: false})
				})

				// setData({...data, success: response.success})
				// emptyCart(() => {
				// 	console.log("payment success and empty cart");
				// 	setData({loading: false})
				// });
			})
			.catch(error => {
				console.log(error)
				setData({loading: false})
			})
		})
		.catch(error => {
			// console.log("drop error: ", error)
			setData({...data, error: error.message})
		})
	}

	const showDropIn = () => (
		<div onBlur={() => setData({...data, error: ""})}>
			{data.clientToken !== null && products.length > 0 ? (
					<div>
						<div className="form-group mb-3">
						<label className="text-muted">Adresse de livraison:</label>
						<textarea 
							onChange={handleAddress} 
							className="form-control" 
							value={data.address} 
							placeholder="Tapez votre address de livraison..." />
						</div>
						<DropIn options={{
							authorization: data.clientToken,
							paypal: {flow: "vault"}
						}} onInstance={instance => (data.instance = instance)} />
						<button onClick={buy} className="btn btn-success btn-block">Payer</button>
					</div>
				) : null}
		</div>
	)

	const showError = error => (
		<div className="alert alert-danger" style={{display: error ? "" : "none"}}>
			{error}
		</div>
	)

	const showSuccess = success => (
		<div className="alert alert-info" style={{display: success ? "" : "none"}}>
			Merci! Votre paiement a été effectué avec succès!
		</div>
	);

	const showLoading = (loading) => (
		loading && (<h2 className="text-primary">Chargement...</h2>)
	)


	return (
		<div>
			<h2>Total de la commande: <b>{getTotal()}</b> TND</h2>
			{showLoading(data.loading)}
			{showSuccess(data.success)}
			{showError(data.error)}
			{showCheckout()}
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
		</div>
	);
}


export default Checkout;
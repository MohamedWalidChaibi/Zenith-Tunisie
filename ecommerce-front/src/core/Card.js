import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import "moment/locale/fr";
import {addItem, updateItem, removeItem} from "./cartHelpers"


const Card = ({
	product, showViewProductButton = true, showAddToCartButton = true, cartUpdate=false, showRemoveProductButton=false, setRun = f => f,  run = undefined 
}) => {
	const[redirect, setRedirect] = useState(false);
	const[count, setCount] = useState(product.count);

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 mr-2">
							Voir l'article
					</button>
				</Link>
			)
		)
	}

	const addToCart = () => {
		addItem(product, () => {
			setRedirect(true)
		})
	}

	const shouldRedirect = redirect => {
		if(redirect) {
			return <Redirect to="/cart" />
		}
	}

	const showAddToCart = (showAddToCartButton, quantity) => {
		if (quantity > 0) {
			return showAddToCartButton && (

			<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
					Ajouter au panier
			</button>	
		)

			
		} else {
			showAddToCartButton = false;

		}
	}

	const showRemoveButton = (showRemoveProductButton) => {
		return showRemoveProductButton && (

			<button onClick={() =>{ removeItem(product._id); setRun(!run);}} className="btn btn-outline-danger mt-2 mb-2">
					Supprimer l'article
			</button>	
		)
	}

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className="badge badge-primary badge-pill">En Stock</span>
		) : (
			<span className="badge badge-danger badge-pill">Rupture de Stock</span>
		);
	};

	const handleChange = productId => event => {
		setRun(!run);
		setCount(event.target.value < 1 ? 1 : event.target.value)
		if(event.target.value >= 1) {
			updateItem(productId, event.target.value)
		}
	}

	const showCartUpdateOptions = cartUpdate => {
		return cartUpdate && 
		<div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text">Modifier la quantité</span>
				</div>
				<input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
			</div>
		</div>
	}

	return (
			<div className="card">
				<div className="card-header"><b>{product.name}</b></div>
				<div className="card-body">
					{shouldRedirect(redirect)}
					<ShowImage item={product} url="product" />
					<p className="lead mt-2">{product.description.substring(0, 1000)}</p>
					<p className="black">{product.price} TND</p>
					<p className="black">Catégorie: {product.category && product.category.name}</p>
					<p className="black">Ajouté {moment(product.createdAt).lang("fr").fromNow()}</p>
					{showStock(product.quantity)}
					<br/>
					{showViewButton(showViewProductButton)}
					{showAddToCart(showAddToCartButton, product.quantity)}
					{showRemoveButton(showRemoveProductButton)}
					{showCartUpdateOptions(cartUpdate)}
				</div>
			</div>
	);
};


export default Card;
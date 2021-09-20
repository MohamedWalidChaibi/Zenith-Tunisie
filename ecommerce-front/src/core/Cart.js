import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Layout from "./Layout";
import {getCart, removeItem} from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout"
import Footer from "./Footer"


const Cart = () => {
	const [items, setItems] = useState([])
	const [run, setRun] = useState(false);

	useEffect(() => {
		setItems(getCart())
	}, [run])

	const showItems = items => {
		return (
			<div>
				<h2>Votre panier contient {`${items.length}`} articles</h2>
				<hr/>
				{items.map((product, i) => (
					<Card key={i} product={product} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run}/>

				))}
			</div>
		)
	}

	const noItemsMessage = () => (
		<h2>Votre panier est vide.
			<br/>
			<Link to="/shop">
				Continuer vos achats
			</Link>
		</h2>
		)

	return (
	<Layout title="Panier" description=" Vérifier les articles de votre panier" className="container-fluid">
		<div className="row">
			<div className="col-6">
				{items.length > 0 ? showItems(items) : noItemsMessage()}
			</div>

			<div className="col-6">
				<h2 className="mb-4">Sommaire</h2>
				<hr/>
				<Checkout products={items} setRun={setRun} run={run} />
			</div>
		</div>
		{Footer()}
	</Layout>
	);
}


export default Cart;
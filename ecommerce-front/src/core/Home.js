import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import {getProducts} from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Footer from "./Footer"


const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getProducts('sold').then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setProductsBySell(data)
			}
		})
	}

	const loadProductsByArrival = () => {
		getProducts('createdAt').then(data => {
			if(data.error) {
				setError(data.error)
			} else {
				setProductsByArrival(data)
			}
		})
	}

	useEffect(() => {
		loadProductsByArrival()
		loadProductsBySell()
	}, []);

	return (
	<Layout title="Zenith Tunisie" description="Vente des produits médicaux et paramédicaux" className="container-fluid">
		<Search/>
		<h2 className="mb-4">Nouveaux produits</h2>
		<div className="row">
			{productsByArrival.map((product, i) => (<div key={i} className="col-4 mb-3"><Card product={product}/></div>))}
		</div>

		<h2 className="mb-4">Meilleurs ventes</h2>
		<div className="row">
			{productsBySell.map((product, i) => (<div key={i} className="col-4 mb-3"><Card product={product}/></div>))}
		</div>

		{Footer()}
	</Layout>
	);
}


export default Home;
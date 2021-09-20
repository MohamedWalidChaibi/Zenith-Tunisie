import React, {useState, useEffect} from "react";
import {getCategories, list} from "./apiCore";
import Card from "./Card";
import {Carousel} from "react-bootstrap"
import img1 from "../assets/1.png";
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpg"



const Search = () => {
	const [data, setData] = useState({
		categories: [],
		category: "",
		search: "",
		results: [],
		searched: false
	});

	const {categories, category, search, results, searched} = data;

	const loadCategories = () => {
		getCategories().then(data => {
			if(data.error) {
				console.log(data.error)
			} else {
				setData({...data, categories: data})
			}
		})
	}

	useEffect(() => {
		loadCategories();
	}, []);

	const searchData = () => {
		console.log(search, category)
		if(search) {
			list({ search: search || undefined, category: category }).then(
				response => {
				if(response.error) {
					console.log(response.error)
				} else {
					setData({ ...data, results: response, searched: true });
				}
			})
		}
	}

	const searchSubmit = e => {
		e.preventDefault();
		searchData()
	}

	const handleChange = name => event => {
		setData({ ...data, [name]: event.target.value, searched: false });
	}

	const searchMessage = (searched, results) => {
		if(searched && results.length > 0) {
			return `${results.length} articles trouvés`
		}

		if(searched && results.length < 1) {
			return `Aucun article trouvé`
		}
	} 

	const searchedProducts = (results = []) => {
		return (
			<div>
				<h2 className="mt-4 mb-4">
					{searchMessage(searched, results)}
				</h2>
				<div className="row">
					{results.map((product, i) => (<div key={i} className="col-4 mb-3"><Card product={product} /></div>))}
				</div>
			</div>
		);
	}

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<span className="input-group-text">
				<div className="input-group input-group-lg">
					<div className="input-group-prepend">
						<select className="btn mr-2" onChange={handleChange("category")}>
							<option value="All">Toutes catégories</option>
							{categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
						</select>
					</div>

					<input type="search" className="form-control" onChange={handleChange("search")} placeholder="Tapez le nom de votre article..." />
				</div>
				<div className="btn input-group-append" style={{border: "none"}}>
					<button className="input-group-text">Rechercher</button>
				</div>
			</span>
		</form>
	);

	const carousel = () => {
		return (<Carousel>
		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img1}
		      alt="First slide"/>
		  </Carousel.Item>

		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img2}
		      alt="Second slide"/>
		  </Carousel.Item>

		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img3}
		      alt="Third slide"/>
		  </Carousel.Item>

		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img4}
		      alt="Third slide"/>
		  </Carousel.Item>

		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img5}
		      alt="Third slide"/>
		  </Carousel.Item>

		  <Carousel.Item>
		    <img
		      className="d-block w-100"
		      src={img6}
		      alt="Third slide"/>
		  </Carousel.Item>
		</Carousel>)
	}

	return (
		<div className="row">
			
			<div className="container">
				{searchForm()}
			</div>
			
			<div className="container-fluid">
				{searchedProducts(results)}
			</div>
			<div>
				{carousel()}
			</div>
			<div href="/">
				<img src="https://scontent.ftun10-1.fna.fbcdn.net/v/t1.6435-9/33104654_395229164325683_6582353808540565504_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=2zLD_csb5G8AX8vQc82&_nc_ht=scontent.ftun10-1.fna&oh=0b5d14eb237e5924c8de0e06c41564a9&oe=61461907"
				alt="Zenith SARL"
      			 width="200"
     			 height="200"
     			 className="rounded mx-auto d-block" href="/" />
			</div>
			<hr/>
		</div>
	);
};


export default Search;
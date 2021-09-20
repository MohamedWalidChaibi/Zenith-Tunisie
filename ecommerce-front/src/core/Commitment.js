import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer"


const Commitment = () => {
	return (
		<Layout title="Zenith Tunisie" description="Vente des produits médicaux et paramédicaux" className="container-fluid">
		<div className="row">
		<div className="mt-2 ml-2">
		<h4 className="text-primary">Nos engagements</h4>
		<br/>
		<div>
			<p><strong>Satisfaction client :</strong></p>
				
				<p>Votre satisfaction est notre principale préoccupation. Notre objectif est de faire en sorte que votre expérience sur le site internet Zenith se déroule au mieux et que vous soyez satisfaits de nos produits.
				</p>
				
		</div>
		<br/>
		<div>
 			<p><strong>Rapport qualité/prix :</strong></p> 
 			
 				<p>Nous choisissons nos fournisseurs avec le plus grand soin. Nous vous fournissons des produits de qualité aux meilleurs prix.
 				</p>
			
		</div>
		<br/>
		<div>
			<p><strong>Proximité :</strong></p>
			
				<p>Nous sommes proches de nos clients.
           		</p>
           	
           
        </div>
        <br/>
        <div>
			<p><strong>Conseil :</strong></p>
			
				<p>Nous sommes à votre disposition pour vous conseiller avant votre achat.
           		</p>
           	
           <br/>
        </div>
        </div>	
		</div>

		{Footer()}
	</Layout>
	)
}

export default Commitment;

import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer"
import Pay from "../assets/Payment.png"


const Payment = () => {
	return (
		<Layout title="Boutique Zenith" description="Vente des produits médicaux et paramédicaux" className="container-fluid">
		<div className="row">
		<div className="mt-2 ml-2">
		<h4 className="text-primary">Payment</h4>
		<br/>
		<p><strong>Choix et sécurité:</strong></p>
				
				<p>Vous pouvez choisir parmi ces modes de paiement :</p>
				
		<br/>
		<div class="center"><img src={Pay}
					alt="Zenith SARL"
    				
     			 	className="img-responsive" to="/" />
     	</div>
     	<br/>
        </div>	
		</div>

		{Footer()}
	</Layout>
	)
}

export default Payment;
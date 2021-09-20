import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer"


const Delivery = () => {
	return (
		<Layout title="Boutique Zenith" description="Vente des produits médicaux et paramédicaux" className="container-fluid">
		<div className="row">
		<div className="mt-2 ml-2">
		<h4 className="text-primary">Livraison</h4>
		<br/>
		<div>
			<p><strong>Adresse de livraison :</strong></p>
				
				<p>Les produits sont livrés par transporteur à l'adresse de livraison que vous avez indiquée au cours du processus de commande.
				</p>
				
		</div>
		<br/>
		<div>
 			<p><strong>Délais de livraison :</strong></p> 
 			
 				<p>Le délai d’expédition pour les commandes passées sur Grand Tunis est de 24h à 48h. Pour les commandes passées sur les autres gouvernorats est de 2j à 7j.
 				</p>
 				<p>Si votre commande contient des produits en stock et d'autres encore en achat chez notre fournisseur, vous recevrez votre commande une fois que tous vos produits seront disponibles.</p>
 				<p> Si vous souhaitez recevoir au plus vite les produits prêts à être expédiés, nous vous conseillons d'isoler ces articles dans une commande spécifique.</p>
			
		</div>
		<br/>
		<div>
			<p><strong>Vous souhaitez connaître l'état de votre commande ?</strong></p>
			
				<p>Dès que votre commande sera envoyée, vous pouvez connecter sur votre compte personnel pour suivre l'état de votre commande, soit contacter notre service client au +216 99 202 007.
           		</p>
           	
           
        </div>
        <br/>
        <div>
			<p><strong>Les frais de livraison :</strong></p>
			
				<p>Lorsque vous commandez sur le site, les frais de livraison sont offerts dès 300 TND d'achat. En dessous de 300 TND d'achat, le montant des frais sera calculé en fonction de l’adresse de livraison et du nombre total d'articles dans votre panier.
           		</p>
           	
           <br/>
        </div>
        </div>	
		</div>

		{Footer()}
	</Layout>
	)
}

export default Delivery;

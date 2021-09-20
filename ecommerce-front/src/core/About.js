import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer"
import { FaAddressCard, FaEnvelope, FaPhoneSquareAlt } from "react-icons/fa";


const About = () => {
	return (
		<Layout title="Zenith Tunisie" description="Vente des produits médicaux et paramédicaux" className="container-fluid">
		<div className="row">
		<div className="mt-2 ml-2">
		<div>
			<h4 className="text-primary">Qui sommes nous ?</h4>
			<p>Basée dans la ville de Tunis, Zenith est une entreprise tunisienne dynamique et réactive créée en 2013. Elle propose un large éventail de produits médicaux et paramédicaux destinés aux particuliers et aux professionnels de santé. Les bureaux de l’entreprise sont en relation directe avec l’entrepôt, ce qui permet d’avoir une bonne communication entre tous les salariés de l’entreprise.
			<br/>Nous recevons plusieurs centaines de commandes par mois, nous nous efforçons de répondre aux mieux à vos demandes pour vous fournir un haut niveau de qualité et de service.</p>
		</div>	
		<hr/>
		<div>
			<h4 className="text-primary">Le catalogue :</h4>
				<p>Nous travaillons au quotidien pour étoffer l’offre de Zenith afin de répondre au mieux à vos besoins, en vous proposant des produits de qualité toujours à des prix toujours compétitifs.</p>
				<p>Zenith propose aujourd'hui plusieurs références dans les catégories suivantes :</p>
			<ul>
				<li>Instrument médical</li>
				<li>Hygiène</li>
				<li>Equipement médical</li>
				<li>Vêtement médical</li>
				<li>Consommable</li>
				<li>Matériel de diagnostic</li>
				<li>Instrument dentaire</li>
				<li>Instrument chirurgical</li>
				<li>Paramédical</li>
			</ul>
		</div>	
		<hr/>
		<div>	
		<h4 className="text-primary">Contact :</h4>
		<div>
			<p><FaAddressCard className="mb-1"/><strong> Adresse:</strong></p>
				<ul>
				<p>Siège Social: 3 bis, Rue de Réservoir Beb Menara 1008 Tunis
				<br/>Filiale: Avenue Habib Bourguiba Béni Khiar 8060 Nabeul </p>
				</ul>
		</div>
		<div>
 			<p><strong><FaPhoneSquareAlt className="mb-1"/> Tél: </strong></p> 
 			<ul>
 				<p>Service Commercial Tunis: + 216 99 202 007
 				<br/>Service Commercial Nabel: + 216 99 006 505
				<br/>Siège Social: +216 98 328 305 / +216 71 568 166</p>
			</ul>
		</div>
		<div>
			<p><strong><FaEnvelope className="mb-1"/> Email :</strong>
			<ul>
				<p>zenith.tn@planet.tn
           		<br/>zenith.sarl.tn@gmail.com</p>
           	</ul>
           </p>
        </div>
        </div>	
	</div>
	</div>
	<hr/>
		{Footer()}
	</Layout>
	)
}

export default About;
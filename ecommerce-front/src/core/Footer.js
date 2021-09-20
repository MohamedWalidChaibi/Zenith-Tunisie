import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import { FaPhoneSquareAlt, FaEnvelope, FaAddressCard, FaFacebook, FaWhatsapp, FaRegEnvelope, FaMapMarkerAlt } from "react-icons/fa";



const Footer = () => {
	return (
	<div className="bg-primary text-white main-footer">
		<div className="container">
			<div className="row">
				{/* Column1 */}
				<div className="col">
					<h4>À propos Zenith Tunisie</h4>
					<ul className="list-unstyled">
						<li ><Link className="text-white bg-primary" to="/about">Qui somme nous ?</Link></li>
						<li ><Link className="text-white bg-primary" to="/Commitment">Nos Engagements</Link></li>
						<li ><a className="text-white" href="https://www.facebook.com/zenit.sarl"><FaFacebook title="Facebook"/></a> <a className="text-white" href="https://wa.me/21699202007"><FaWhatsapp title="Whatsapp"/></a> <a className="text-white" href="https://mail.google.com/mail/u/0/#all?compose=new"><FaRegEnvelope title="Gmail"/></a> <a className="text-white" href="https://goo.gl/maps/ppVb6u79wrcsUbJR8"><FaMapMarkerAlt title="Google Maps"/></a></li>
					</ul>
				</div>
				{/* Column2 */}
				<div className="col">
					<h4>Besoin d'aide ?</h4>
					<ul className="list-unstyled">
						<li><Link className="text-white bg-primary" to="/Delivery">Informations de livraison</Link></li>
						<li ><Link className="text-white bg-primary" to="/Payment">Informations de payement</Link></li>
					</ul>
				</div>
			{/* Column3 */}
				<div className="col">
					<h4>Nous contacter</h4>
					<ul className="list-unstyled">
						<li ><strong><FaPhoneSquareAlt className="mb-1"/> Tél: </strong>+216 99 202 007 </li>
						<li><strong><FaEnvelope className="mb-1"/> Email: </strong>zenith.sarl.tn@gmail.com</li>
						<li><strong><FaAddressCard className="mb-1"/> Adresse: </strong>3 bis, Rue de Réservoir Beb Menara Tunisie</li>
					</ul>
				</div>
				<hr/>
				<div className="footer-bottom">
					<p className="text-xs-center">
						&copy;{new Date().getFullYear()} Zenith Tunisie. Tous droits réservés.
					</p>
				</div>
			</div>
		</div>
	</div>
	)
}



export default Footer;
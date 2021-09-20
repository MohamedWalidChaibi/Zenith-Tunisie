import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth";
import {itemTotal} from "./cartHelpers"
import { FaHome, FaInfoCircle, FaStore, FaCartPlus, FaUserCheck, FaRegUserCircle, FaPowerOff, FaUserPlus } from "react-icons/fa";


const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {color: "#ff9900"};
	} else {
		return {color: "#ffffff"};
	}
};

const Menu = ({history}) => (
	<div>

		<ul className="nav nav-tabs bg-primary main-menu">
			<li className="nav-item">
				<a href="/commitment">
					<img src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.6435-9/87035404_842870446228217_4706121422869626880_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=JUHsC8GE0tAAX_XZH1h&_nc_ht=scontent.ftun4-1.fna&oh=c5fbfa975be94d74a2d06a9d5c57d0ef&oe=614D2D19"
					alt="Zenith SARL"
      			 	width="55"
     			 	height="50"
     			 	className="img-responsive" to="/commitment" />
     			 </a>
			</li>
			<li className="nav-item">
				<Link className="nav-link" style={isActive(history, "/" )} to="/">
					<FaHome className="mb-1"/> Accueil
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link" style={isActive(history, "/about" )} to="/about">
					<FaInfoCircle className="mb-1"/> À propos
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link" style={isActive(history, "/shop" )} to="/shop">
					<FaStore className="mb-1"/> Boutique
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link" style={isActive(history, "/cart" )} to="/cart">
					<FaCartPlus className="mb-1"/> Panier <sup><small className="cart-badge">{itemTotal()}</small></sup>
				</Link>
			</li>

			{isAuthenticated() && isAuthenticated().user.role === 0 &&  (
				<li className="nav-item ml-auto">
					<Link className="nav-link" style={isActive(history, "/user/dashboard" )} to="/user/dashboard">
						<FaUserCheck className="mb-1"/> Mon Compte
					</Link>
				</li>
			)}

			{isAuthenticated() && isAuthenticated().user.role === 1 &&  (
				<li className="nav-item ml-auto">
					<Link className="nav-link" style={isActive(history, "/admin/dashboard/${user._id}" )} to="/admin/dashboard">
						<FaUserCheck className="mb-1"/> Mon compte
					</Link>
				</li>
			)}

			{!isAuthenticated() && (
				<Fragment>
					<li className="nav-item ml-auto">
						<Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
							<FaRegUserCircle className="mb-1"/> Connexion
						</Link>
					</li>

					<li className="nav-item">
						<Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
							<FaUserPlus className="mb-1"/> Inscription
						</Link>
					</li>
				</Fragment>
			)}

			<li className="nav-iteam">
				{isAuthenticated() && (
					<span className="nav-link" 
						style={{cursor: "pointer", color: "#ffffff"}} 
						onClick={() => signout(() => {history.push("/");})}>
							<FaPowerOff className="mb-1"/> Déconnection
					</span>
				)}
			</li>
		</ul>

	</div>


);


export default withRouter(Menu);
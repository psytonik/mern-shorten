import {
	MDBCollapse,
	MDBContainer,
	MDBIcon,
	MDBNavbar,
	MDBNavbarBrand, MDBNavbarItem,
	MDBNavbarNav,
	MDBNavbarToggler
} from "mdb-react-ui-kit";
import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";

const NavBar = () => {
	const history = useHistory();
	const {logOut} = useContext(AuthContext);
	const [showNav, setShowNav] = useState(false);

	const logOutHandler = event => {
		event.preventDefault();
		logOut();
		history.push('/')
	}
	return (
		<MDBNavbar expand='lg' light bgColor='light'>
			<MDBContainer fluid>
				<MDBNavbarBrand href="/">Shorten</MDBNavbarBrand>
				<MDBNavbarToggler
					type='button'
					aria-expanded='false'
					aria-label='Toggle navigation'
					onClick={() => setShowNav(!showNav)}
				>
					<MDBIcon icon='bars' fas />
				</MDBNavbarToggler>
				<MDBCollapse navbar show={showNav}>
					<MDBNavbarNav right className='mb-2 mb-lg-0'>
						<MDBNavbarItem>
							<NavLink className="nav-link" to={'/create'}>Create</NavLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<NavLink className="nav-link" to={'/links'}>Links</NavLink>
						</MDBNavbarItem>
						<MDBNavbarItem>
							<NavLink className="nav-link" to="/" onClick={logOutHandler}>LogOut</NavLink>
						</MDBNavbarItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBContainer>
		</MDBNavbar>
	);
};

export default NavBar;

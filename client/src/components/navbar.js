import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.js";

const NavBar = () => {
	const history = useHistory();
	const {logOut} = useContext(AuthContext)
	const logOutHandler = event => {
		event.preventDefault();
		logOut();
		history.push('/')
	}

	return (
		<Navbar bg="light" expand="lg">
			<Container >
				<Navbar.Brand href="/" >Shorten</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<li className="nav-item">
							<NavLink className="nav-link" to={'/create'}>Create</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={'/links'}>Links</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/" onClick={logOutHandler}>LogOut</NavLink>
						</li>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;

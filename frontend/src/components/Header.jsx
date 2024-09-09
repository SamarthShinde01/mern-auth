import { Nav, Navbar, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

export const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);

	return (
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand>MERN Auth</Navbar.Brand>
				</LinkContainer>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{userInfo ? (
						<Nav className="ms-auto">
							<NavDropdown title={userInfo.name} id="username">
								<LinkContainer to={"/profile"}>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>

								<NavDropdown.Item>Logout</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					) : (
						<Nav className="ms-auto">
							<LinkContainer to="/login">
								<Nav.Link>
									<FaSignInAlt /> Sign In
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to="/register">
								<Nav.Link>
									<FaSignOutAlt /> Sign Up
								</Nav.Link>
							</LinkContainer>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

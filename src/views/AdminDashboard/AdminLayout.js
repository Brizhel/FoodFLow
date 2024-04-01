import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { usePage } from '../../PageContext';
import { Link } from 'react-router-dom';
function AdminLayout({ children }) {
    const { currentPage } = usePage(); // Obtén el nombre de la página del contexto
    const [expanded, setExpanded] = useState(false);
    const handleNavCollapse = () => {
        setExpanded(false); // Colapsar la barra de navegación
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="sticky-top">
                <Navbar.Brand className='mx-4'>{currentPage}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' onClick={handleNavCollapse}>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dishes' onClick={handleNavCollapse}>Platos</Nav.Link>
                        <Nav.Link as={Link} to='/admin/waiters' onClick={handleNavCollapse}>Meseros</Nav.Link>
                        <NavDropdown  bg="dark" title="Pedidos" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to='/admin/tickets'>Pendientes</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/admin/tickets/today'>Del día</NavDropdown.Item>
                        </NavDropdown>                        
                        <Nav.Link as={Link} to='/admin/tables' onClick={handleNavCollapse}>Mesas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="ml-auto mx-4 justify-content-end">
                    <Nav>
                        <Nav.Link href='#logout' onClick={handleNavCollapse}>Cerrar Sesion</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </div>
    );
}

export default AdminLayout;
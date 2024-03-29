import React, { useContext, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DishView from'../../views/Dishes/DishView';
function AdminLayout({ children }) {
    const [expanded, setExpanded] = useState(false);
    const handleNavCollapse = () => {
        setExpanded(false); // Colapsar la barra de navegación
      };
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="sticky-top">
                <Navbar.Brand className='mx-4' href="#home">Administrador</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/' onClick={handleNavCollapse}>Inicio</Nav.Link>
                        <Nav.Link as={Link} to='/admin/dishes' onClick={handleNavCollapse}>Platos</Nav.Link>
                        <Nav.Link href='#meseros' onClick={handleNavCollapse}>Meseros</Nav.Link>
                        <Nav.Link href='#Pedidos' onClick={handleNavCollapse}>Pedidos</Nav.Link>
                        <Nav.Link href='#Mesas' onClick={handleNavCollapse}>Mesas</Nav.Link>
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
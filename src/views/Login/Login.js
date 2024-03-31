// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginController from '../../controllers/LoginController'
import { useUser } from '../../UserContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Iniciar sesión utilizando el controlador de inicio de sesión
      const userData = await LoginController.login(username, password);
      const { role, waiterId } = userData;
      // Redirigir al usuario a la ruta correspondiente según su rol
      if (role === 'ROLE_WAITER') {
        setUser({ role, waiterId });
        navigate('/waiter');
      } else if (role === 'ROLE_ADMIN') {
        setUser({ role, waiterId });
        navigate('/admin');
      } else {
        console.log('Rol no espesificado' + role);
      }
      console.log("Inicio de sesion Exitoso");
    } catch (error) {
      console.error(error.message);
      // Manejar errores de inicio de sesión
    }
  };
  return (
    <Container className="d-flex align-items-center" style={{ minHeight: '90vh' }}>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Form className='bg-dark1 rounded shadow p-4'>
            <Form.Group className='mt-3' controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="Username" value={username} placeholder="Ingresa tu usuario" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className='mt-3' controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={password} placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className='text-center'>
              <Button variant="primary" className='mt-3 mx-auto btn-orange1' onClick={handleLogin} type="submit" size='lg'>
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;

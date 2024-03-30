import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import WaiterController from '../../controllers/WaiterController';
import { usePage } from '../../PageContext';

function WaiterView() {
    const { setCurrentPage } = usePage();
    const [waiters, setWaiters] = useState([]);
    const waiterController = new WaiterController();
    const [showModal, setShowModal] = useState(false);
    const [editWaiterId, setEditWaiterId] = useState(null);
    const [newWaiter, setNewWaiter] = useState({ id: null, firstName: '', lastName: '', username: '', password: '' });

    const handleCloseModal = () => {
        setShowModal(false);
        setEditWaiterId(null);
        setNewWaiter({ id: null, firstName: '', lastName: '', username: '', password: '' });
    };
    const handleShowModal = () => setShowModal(true);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewWaiter({ ...newWaiter, [name]: value });
    };
    const handleAddWaiter = async () => {
        try {
            if (editWaiterId) {
                await waiterController.updateWaiter(editWaiterId, newWaiter);
                const updatedWaiters = waiters.map(waiter => {
                    if (waiter.id === editWaiterId) {
                        return { ...newWaiter, id: editWaiterId };
                    }
                    return waiter;
                });
                setWaiters(updatedWaiters);
            } else {
                await waiterController.createWaiter(newWaiter);
                setWaiters([...waiters, { ...newWaiter, id: waiters.length + 1 }]);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al agregar o editar el camarero:', error);
        }
    };
    const handleDeleteWaiter = async (id) => {
        try {
            await waiterController.deleteWaiter(id);
            setWaiters(waiters.filter(waiter => waiter.id !== id));
            alert('Camarero eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el camarero:', error);
        }
    };

    const handleEditWaiter = async (id) => {
        try {
            const waiterToEdit = waiters.find(waiter => waiter.id === id);
            if (!waiterToEdit) {
                throw new Error('Camarero no encontrado');
            }

            // Aquí puedes realizar cualquier lógica adicional necesaria antes de mostrar el modal

            setNewWaiter(waiterToEdit);
            setEditWaiterId(id);
            handleShowModal();
        } catch (error) {
            console.error('Error al editar el camarero:', error);
            // Manejar el error según sea necesario
        }
    };

    useEffect(() => {
        const fetchWaiters = async () => {
            try {
                const allWaiters = await waiterController.getAllWaiters();
                //const allWaiters = await waiterController.getMockWaiters();
                setWaiters(allWaiters);
            } catch (error) {
                console.error('Error al obtener los camareros:', error.message);
            }
        };
        setCurrentPage('Meseros');
        fetchWaiters();
    }, []);

    return (
        <Container className='mt-5'>
            <Row>
                {waiters.map(waiter => (
                    <Col key={waiter.id} md={4} className="mb-3">
                        <Card className="bg-darkgray1" text="white">
                            <Card.Body>
                                <Card.Title>{waiter.firstName} {waiter.lastName}</Card.Title>
                                <Card.Text>Usuario: {waiter.username}</Card.Text>
                                <Button variant="primary" onClick={() => handleEditWaiter(waiter.id)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteWaiter(waiter.id)}>Borrar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Col md={12} className="mb-3">
                <Button variant="success" onClick={handleShowModal} style={{ fontSize: '2rem', width: '4rem', height: '4rem' }} className="rounded-circle btn-orange1 fixed-add-btn">&#43;</Button>
            </Col>
            {/* Modal para añadir camarero */}
            <Modal contentClassName="bg-darkgray1" show={showModal} onHide={handleCloseModal} closeButton={<button className="custom-close-button">×</button>}>
                <Modal.Header closeButton closeButtonClassName="custom-modal-close-btn">
                    <Modal.Title>{editWaiterId ? 'Editar Camarero' : 'Añadir Camarero'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="firstName" value={newWaiter.firstName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" name="lastName" value={newWaiter.lastName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" name="username" value={newWaiter.username} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" value={newWaiter.password} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                    <Button variant="primary" className='btn-orange1' onClick={handleAddWaiter}>{editWaiterId ? 'Guardar cambios' : 'Guardar'}</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default WaiterView;
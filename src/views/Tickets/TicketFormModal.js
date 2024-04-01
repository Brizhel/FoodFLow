import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import DishController from '../../controllers/DishController';
import DiningTableController from '../../controllers/DiningTableController';
import TicketController from '../../controllers/TicketController';
import Ticket from '../../models/Ticket';
import UserContext from '../../UserContext';

function TicketFormModal({ show, handleClose, addNewTicket }) {
    const { user } = useContext(UserContext);
    const [tables, setTables] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [ticketItems, setTicketItems] = useState([]);
    const [comment, setComment] = useState('');
    const [selectedDish, setSelectedDish] = useState(null);
    const [dishModalShow, setDishModalShow] = useState(false);
    const [dishComment, setDishComment] = useState('');

    useEffect(() => {
        const tableController = new DiningTableController();
        tableController.getAllTables()
            .then(data => setTables(data))
            .catch(error => console.error('Error fetching tables:', error));
        const dishController = new DishController();
        dishController.getAllDishes()
            .then(data => setDishes(data))
            .catch(error => console.error('Error fetching dishes:', error));
        setSelectedTable(null);
    }, [show]);

    const handleTableSelect = (tableId) => {
        const table = tables.find(table => table.id === tableId);
        setSelectedTable(table);
    };

    const handleAddTicketItem = (dish) => {
        setSelectedDish(dish);
        setDishModalShow(true);
    };

    const handleRemoveTicketItem = (index) => {
        const updatedTicketItems = [...ticketItems];
        updatedTicketItems.splice(index, 1);
        setTicketItems(updatedTicketItems);
    };

    const handleDishSelect = () => {
        const newTicketItem = { dish: selectedDish, comment: dishComment };
        setTicketItems([...ticketItems, newTicketItem]);
        setDishModalShow(false);
        setDishComment('');
    };

    const handleSubmit = async () => {
        const ticket = new Ticket(null, selectedTable, ticketItems, comment, new Date(), false, null);
        const waiterId = user.waiterId;
        const ticketController = new TicketController;
        const newTicket = await ticketController.createTicket(ticket, waiterId)
        addNewTicket(newTicket);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setSelectedTable(null);
        setTicketItems([]);
        setComment('');
        setSelectedDish(null);
        setDishModalShow(false);
        setDishComment('');
        handleClose();
    };

    const canSubmit = selectedTable !== null && ticketItems.length > 0;

    return (
        <Modal contentClassName="bg-darkgray1" show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Seleccionar Mesa</Form.Label>
                        <Form.Control as="select" onChange={(e) => handleTableSelect(parseInt(e.target.value))}>
                            {tables.map(table => (
                                <option key={table.id} value={table.id}>{table.tableType} {table.tableNumber}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" className='my-4' onClick={() => setDishModalShow(true)}>Añadir plato</Button>
                    </Form.Group>

                    {ticketItems.length > 0 && (
                        <Form.Group>
                            <Form.Label>Platos Seleccionados</Form.Label>
                            <ul>
                                {ticketItems.map((ticketItem, index) => (
                                    <li key={index}>
                                        {ticketItem.dish.name} - {ticketItem.comment}
                                        <Button variant="link" onClick={() => handleRemoveTicketItem(index)}>Eliminar</Button>
                                    </li>
                                ))}
                            </ul>
                        </Form.Group>
                    )}

                    <Form.Group>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>Enviar Ticket</Button>
            </Modal.Footer>

            <Modal contentClassName="bg-darkgray1" show={dishModalShow} onHide={() => setDishModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Plato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="justify-content-start">
                            {dishes.map(dish => (
                                <Col key={dish.id} xs={6} sm={4} md={3} className="mb-3">
                                    <Button
                                        variant={selectedDish && selectedDish.id === dish.id ? 'success' : 'outline-secondary'}
                                        onClick={() => setSelectedDish(selectedDish && selectedDish.id === dish.id ? null : dish)}
                                        className="w-100 d-flex justify-content-center align-items-center text-wrap"
                                        style={{ fontSize: "1rem" }}
                                    >
                                        {dish.name}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Form.Control
                        type="text"
                        placeholder="Comentario"
                        value={dishComment}
                        onChange={(e) => setDishComment(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDishModalShow(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleDishSelect}>Seleccionar</Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    );
}

export default TicketFormModal;

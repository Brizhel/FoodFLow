import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TicketController from '../../controllers/TicketController';
import TicketFormModal from './TicketFormModal';

function TicketView() {
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const ticketController = new TicketController();
    const handleCloseModal = () => { setShowModal(false) };
    const handleShowModal = () => setShowModal(true);

    const handleDeleteTicket = async (ticketId) => {
        try {
            await ticketController.deleteTicket(ticketId);
            // Filtrar los tickets para eliminar el ticket con el ID correspondiente
            const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
            setTickets(updatedTickets);
        } catch (error) {
            console.error('Error al eliminar el ticket:', error.message);
        }
    };

    const addNewTicket = (newTicket) => {
        setTickets([...tickets, newTicket]);
    };
    function calculateTotal(ticketItems) {
        let total = 0;
        for (const item of ticketItems) {
            total += item.dish ? item.dish.price : 0;
        }
        return total;
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const allTickets = await ticketController.getAllTicketsOfToday();
                console.log(allTickets);
                setTickets(allTickets);
            } catch (error) {
                console.error('Error al obtener los tickets:', error.message);
            }
        };
        fetchTickets();
    }, []);

    return (
        <Container className='mt-5'>
            <Row>
                {tickets.map(ticket => (
                    <Col key={ticket.id} md={4} className="mb-3">
                        <Card className="bg-darkgray1" text="white">
                            <Card.Body>
                                <Card.Title>{`${ticket.diningTable.tableType} - ${ticket.diningTable.tableNumber}`}</Card.Title>
                                <Card.Text>{`Mesero: ${ticket.waiter.firstName} ${ticket.waiter.lastName}`}</Card.Text>
                                <Card.Text>{`Hora de creación: ${formatTime(ticket.creationDate)}`}</Card.Text>
                                <Card.Text>Platos:</Card.Text>
                                {ticket.ticketItems.map((item, index) => (
                                    <li key={index}>
                                        {item.dish ? item.dish.name : 'Nombre no disponible'} - {item.comment ? item.comment : 'Sin comentario'} - <span style={{ opacity: 0.6 }}>{item.dish.price}$</span>
                                    </li>
                                ))}
                                <Card.Footer>{ticket.comment}</Card.Footer>
                                <Card.Text style={{ opacity: 0.6 }}>Total: {calculateTotal(ticket.ticketItems)}$</Card.Text>
                                <Button className='mt-3' variant="danger" onClick={() => handleDeleteTicket(ticket.id)}>Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Col md={12} className="mb-3">
                <Button variant="primary" onClick={handleShowModal}>Crear Ticket</Button>
            </Col>
            {/* Modal para crear un ticket */}
            <TicketFormModal show={showModal} handleClose={handleCloseModal} addNewTicket={addNewTicket} />
        </Container>
    );
}

export default TicketView;

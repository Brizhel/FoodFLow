import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TicketController from '../../controllers/TicketController';
import TicketFormModal from './TicketFormModal';
import useConfirmation from '../useConfirmation'; // Importa la función useConfirmation
import ConfirmationModal from '../Modals/ConfirmationModal';
import TicketWebsocketController from '../../controllers/TicketWebsocketController';

function TicketView() {
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const ticketController = new TicketController();
    const handleCloseModal = () => { setShowModal(false) };
    const handleShowModal = () => setShowModal(true);
    const { handleShowModal: showConfirmationModal, ConfirmationDialog } = useConfirmation(); // Usa la función useConfirmation
    const handleMarkAsDelivered = async (ticketId) => {
        try {
            const confirmation = await showConfirmationModal();
            console.log(confirmation);
            if (confirmation) {
                ticketController.markTicketAsDelivered(ticketId);
                setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
            }
        } catch (error) {
            console.error('Error al marcar el ticket como entregado:', error.message);
        }
    };
    const addNewTicket = (newTicket) => {
        setTickets([...tickets, newTicket]);
    };
    const handleTicketUpdate = (updatedTicket) => {
        setTickets(prevTickets => {
            const index = prevTickets.findIndex(ticket => ticket.id === updatedTicket.id);
            if (index !== -1) {
                // Si el ticket ya existe, actualiza el ticket en la lista
                const updatedTickets = [...prevTickets];
                updatedTickets[index] = updatedTicket;
                return updatedTickets;
            } else {
                // Si el ticket no existe, agrégalo a la lista
                return [...prevTickets, updatedTicket];
            }
        });
    };
    function calculateTotal(ticketItems) {
        let total = 0;
        for (const item of ticketItems) {
            total += item.dish ? item.dish.price : 0;
        }
        return total;
    }
    const fetchTickets = async () => {
        try {
            const allTickets = await ticketController.getAllTickets();
            setTickets(allTickets);
        } catch (error) {
            console.error('Error al obtener los tickets:', error.message);
        }
    };
    function formatTime(dateString) {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        fetchTickets();
    }, [showModal]);

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
                                <Button variant="success" onClick={() => handleMarkAsDelivered(ticket.id)}>Entregado</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Col md={12} className="mb-3">
                <Button variant="primary" onClick={handleShowModal}>Crear Ticket</Button>
            </Col>
            {/* Componente TicketWebsocketController para manejar las actualizaciones de tickets */}
            <TicketWebsocketController onTicketUpdate={handleTicketUpdate} />
            {/* Modal para crear un ticket */}
            <ConfirmationDialog message="¿Seguro?" /> {/* Renderiza la ventana de confirmación */}
            <TicketFormModal show={showModal} handleClose={handleCloseModal} addNewTicket={addNewTicket} />
        </Container>
    );
}

export default TicketView;

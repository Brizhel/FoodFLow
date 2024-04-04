import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TicketController from '../../controllers/TicketController';
import TicketFormModal from './TicketFormModal';
import ConfirmationModal from '../Modals/ConfirmationModal';
import useConfirmation from '../useConfirmation';
import TicketWebsocketController from '../../controllers/TicketWebsocketController';
function TicketView() {
    const [showModal, setShowModal] = useState(false);
    const [tickets, setTickets] = useState([]);
    const ticketController = new TicketController();
    const handleCloseModal = () => { setShowModal(false) };
    const handleShowModal = () => setShowModal(true);
    const [isComponentMounted, setIsComponentMounted] = useState(true); // Estado para controlar si el componente está montado
    const { handleShowModal: showConfirmationModal, ConfirmationDialog } = useConfirmation(); // Usa la función useConfirmation


    const handleDeleteTicket = async (ticketId) => {
        try {
            const confirmation = await showConfirmationModal();
            if (confirmation) {
                ticketController.deleteTicket(ticketId);
            }
        } catch (error) {
            console.error('Error al eliminar el ticket:', error.message);
        }
    };

    const handleMarkAsDelivered = async (ticketId) => {
        try {
            const confirmation = await showConfirmationModal();
            if (confirmation) {
                ticketController.markTicketAsDelivered(ticketId);
            }
        } catch (error) {
            console.error('Error al marcar el ticket como entregado:', error.message);
        }
    };
    const handleTicketUpdate = (updatedTicket, action) => {
        switch (action) {
            case 'add':
                console.log('Se añadió un nuevo ticket:', updatedTicket);
                setTickets(prevTickets => [...prevTickets, updatedTicket]);
                break;
            case 'update':
                console.log('Se actualizó un ticket:', updatedTicket);
                setTickets(prevTickets => {
                    const existingTicketIndex = prevTickets.findIndex(ticket => ticket.id === updatedTicket.id);
                    if (existingTicketIndex !== -1) {
                        const newTickets = [...prevTickets];
                        newTickets[existingTicketIndex] = updatedTicket;
                        return newTickets;
                    } else {
                        return [...prevTickets, updatedTicket];
                    }
                });
                break;
            case 'delete':
                console.log('Se eliminó un ticket:', updatedTicket);
                setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== updatedTicket.id));
                break;
            default:
                console.log('Acción desconocida:', action);
                break;
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

    const fetchTickets = async () => {
        try {
            const allTickets = await ticketController.getAllTicketsOfToday();
            setTickets(allTickets);
        } catch (error) {
            console.error('Error al obtener los tickets:', error.message);
        }
    };

    useEffect(() => {
        fetchTickets();
        return () => {
            setIsComponentMounted(false); // Cambia el estado cuando se desmonta el componente
        };
    }, []);

    return (
        <Container className='mt-5'>
            {isComponentMounted && <TicketWebsocketController onTicketUpdate={handleTicketUpdate} />}
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
                                <Card.Footer>Entregado: {ticket.delivered == true ? 'Sí' : 'No'}</Card.Footer>
                                <Button className='mt-3' variant="danger" onClick={() => handleDeleteTicket(ticket.id)}>Eliminar</Button>
                                {!ticket.delivered && (
                                    <Button variant="success" onClick={() => handleMarkAsDelivered(ticket.id)}>Entregado</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Col md={12} className="mb-3">
                <Button variant="primary" onClick={handleShowModal}>Crear Ticket</Button>
            </Col>
            {/* Modal para crear un ticket */}
            <ConfirmationDialog message="¿Seguro?" /> {/* Renderiza la ventana de confirmación */}
            <TicketFormModal show={showModal} handleClose={handleCloseModal} addNewTicket={addNewTicket} />
        </Container>
    );
}

export default TicketView;

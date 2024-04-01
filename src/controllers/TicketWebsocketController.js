import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function TicketWebsocketController({ onTicketUpdate }) {
    useEffect(() => {
        // Establecer conexión WebSocket
        const socket = new SockJS('/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log('Conexión WebSocket establecida');
            // Suscribirse al destino para recibir actualizaciones de tickets
            stompClient.subscribe('/topic/tickets', (message) => {
                // Manejar el mensaje de actualización de ticket recibido del servidor
                const updatedTicket = JSON.parse(message.body);
                console.log('Ticket actualizado:', updatedTicket);
                // Pasar el ticket actualizado al callback proporcionado por el componente padre
                onTicketUpdate(updatedTicket);
            });
        });
        return () => {
            // Desconectar la conexión WebSocket al desmontar el componente
            stompClient.disconnect();
        };
    }, [onTicketUpdate]);

    return null;
}

export default TicketWebsocketController;

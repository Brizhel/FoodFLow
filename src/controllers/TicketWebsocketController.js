import React, { useEffect, useCallback, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Ticket from '../models/Ticket';

function TicketWebsocketController({ onTicketUpdate }) {
    const stompClientRef = useRef(null);

    const handleTicketUpdate = useCallback((message) => {
        const data = JSON.parse(message.body);
        const action = data.action;
        console.log('Action:', action);

        const updatedTicketData = data.ticket;
        const updatedTicket = new Ticket(updatedTicketData.id, updatedTicketData.diningTable, updatedTicketData.ticketItems, updatedTicketData.comment, updatedTicketData.creationDate, updatedTicketData.delivered, updatedTicketData.waiter);
        onTicketUpdate(updatedTicket, action);
    }, [onTicketUpdate]);

    const connectWebSocket = () => {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost/ws');
            const stompClient = Stomp.over(socket);
            Stomp.debug = () => { }; // Deshabilitar los logs de la librería stompjs

            const connectCallback = () => {
                console.log('Conexión WebSocket establecida');
                stompClient.subscribe('/topic/tickets', handleTicketUpdate);
                resolve(stompClient); // Resuelve la promesa con el cliente Stomp una vez que la conexión se establezca
            };

            stompClient.connect({}, connectCallback, (error) => {
                reject(error); // Rechaza la promesa en caso de error en la conexión
            });

            stompClientRef.current = stompClient;
        });
    };

    useEffect(() => {
        // Establecer conexión WebSocket
        connectWebSocket()
            .then(() => {
                console.log('Conexión WebSocket establecida correctamente');
            })
            .catch((error) => {
                console.error('Error al establecer la conexión WebSocket:', error);
            });

        return () => {
            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('Desconectando WebSocket');
                stompClientRef.current.disconnect();
            }
        };
    }, []);

    return null;
}

export default TicketWebsocketController;

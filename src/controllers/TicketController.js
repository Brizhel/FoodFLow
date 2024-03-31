import axios from 'axios';
import Ticket from '../models/Ticket';
import DiningTable from '../models/DiningTable';
import Waiter from '../models/Waiter';
import TicketItem from '../models/TicketItem';
import Dish from '../models/Dish';

class TicketController {
  constructor() {
    this.baseUrl = '/api/tickets';
  }

  async getAllTickets() {
    try {
      const response = await axios.get(this.baseUrl);
      const ticketsData = response.data;
      const tickets = ticketsData.map(ticketData => new Ticket(
        ticketData.id,
        new DiningTable(
          ticketData.table.id,
          ticketData.table.tableType,
          ticketData.table.tableNumber
        ),
        ticketData.ticketItems.map(ticketItemData => new TicketItem(
          ticketItemData.id,
          new Dish(
            ticketItemData.dish.id,
            ticketItemData.dish.name,
            ticketItemData.dish.description,
            ticketItemData.dish.price,
            ticketItemData.dish.fixed
          ),
          ticketItemData.comment
        )),
        ticketData.comment,
        new Date(ticketData.creationDate),
        ticketData.delivered,
        new Waiter(
          ticketData.waiter.id,
          ticketData.waiter.firstName,
          ticketData.waiter.lastName,
          ticketData.waiter.username,
          ticketData.waiter.password
        )
      ));
      return tickets;
    } catch (error) {
      throw new Error('Error al obtener los tickets');
    }
  }

  async createTicket(ticket, waiterId) {
    try {
      const response = await axios.post(`${this.baseUrl}?waiterId=${waiterId}`, ticket);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el ticket');
    }
  }

  async deleteTicket(ticketId) {
    try {
      await axios.delete(`${this.baseUrl}/${ticketId}`);
    } catch (error) {
      throw new Error('Error al eliminar el ticket');
    }
  }

  async getMockTickets() {
    const mockTickets = [
      {
        id: 1,
        table: new DiningTable(1, 'Mesa 1', 1),
        ticketItems: [
          new TicketItem(1, new Dish(1, 'Filete de Ternera', 'Jugoso filete de ternera a la parrilla', 20, true), '¡Extra jugoso por favor!', 2, 20),
          new TicketItem(2, new Dish(2, 'Salmón a la Parrilla', 'Salmón fresco asado a la parrilla', 18, false), 'Sin alcaparras', 1, 18)
        ],
        comment: 'Cliente regular, siempre pide su filete bien hecho.',
        creationDate: '2024-03-27T18:30:00',
        delivered: false,
        waiter: new Waiter(1, 'Juan', 'Martínez', 'juan.martinez', 'password')
      },
      {
        id: 2,
        table: new DiningTable(2, 'Mesa 2', 2),
        ticketItems: [
          new TicketItem(3, new Dish(3, 'Pasta Carbonara', 'Pasta al dente con salsa carbonara cremosa', 15, true), 'Sin cebolla', 1, 15),
          new TicketItem(4, new Dish(4, 'Pizza Margarita', 'Pizza con tomate, mozzarella y albahaca fresca', 12, false), 'Extra queso', 2, 12)
        ],
        comment: 'Grupo de amigos celebrando un cumpleaños.',
        creationDate: '2024-03-26T19:15:00',
        delivered: true,
        waiter: new Waiter(2, 'Ana', 'García', 'ana.garcia', 'password')
      },
      {
        id: 3,
        table: new DiningTable(3, 'Mesa 3', 3),
        ticketItems: [
          new TicketItem(5, new Dish(5, 'Ensalada César', 'Lechuga, pollo a la parrilla, queso parmesano y aderezo César', 12, true), 'Sin crutones', 1, 12),
          new TicketItem(6, new Dish(6, 'Tarta de Manzana', 'Tarta casera de manzana con helado de vainilla', 8, false), 'Sin canela', 1, 8)
        ],
        comment: 'Pedido especial para una cena ligera.',
        creationDate: '2024-03-28T20:00:00',
        delivered: true,
        waiter: new Waiter(3, 'Pedro', 'López', 'pedro.lopez', 'password')
      },
      {
        id: 4,
        table: new DiningTable(4, 'Mesa 4', 4),
        ticketItems: [
          new TicketItem(7, new Dish(7, 'Paella Mixta', 'Paella valenciana con mariscos y carne de pollo', 25, true), 'Extra limón', 1, 25),
          new TicketItem(8, new Dish(8, 'Gazpacho Andaluz', 'Sopa fría de tomate, pepino, pimiento, ajo y aceite de oliva', 10, false), 'Picante', 2, 10)
        ],
        comment: 'Familia celebrando una ocasión especial.',
        creationDate: '2024-03-29T17:45:00',
        delivered: true,
        waiter: new Waiter(4, 'María', 'Ruiz', 'maria.ruiz', 'password')
      },
      {
        id: 5,
        table: new DiningTable(5, 'Mesa 5', 5),
        ticketItems: [
          new TicketItem(9, new Dish(9, 'Hamburguesa Clásica', 'Hamburguesa de carne con lechuga, tomate y cebolla', 10, true), 'Sin cebolla', 2, 10),
          new TicketItem(10, new Dish(10, 'Papas Fritas', 'Papas fritas crujientes', 5, false), 'Extra kétchup', 1, 5)
        ],
        comment: 'Pedido para llevar, listo en 20 minutos.',
        creationDate: '2024-03-30T21:30:00',
        delivered: false,
        waiter: new Waiter(5, 'Luis', 'Sánchez', 'luis.sanchez', 'password')
      },
      {
        id: 6,
        table: new DiningTable(6, 'Mesa 6', 6),
        ticketItems: [
          new TicketItem(11, new Dish(11, 'Sushi Variado', 'Selección de sushi: nigiri, maki y sashimi', 30, true), 'Sin wasabi', 1, 30),
          new TicketItem(12, new Dish(12, 'Tempura de Verduras', 'Verduras variadas rebozadas y fritas', 12, false), 'Salsa de soja extra', 1, 12)
        ],
        comment: 'Pedido para una pareja vegetariana.',
        creationDate: '2024-03-31T19:00:00',
        delivered: false,
        waiter: new Waiter(6, 'Elena', 'Fernández', 'elena.fernandez', 'password')
      },
      {
        id: 7,
        table: new DiningTable(7, 'Mesa 7', 7),
        ticketItems: [
          new TicketItem(13, new Dish(13, 'Costillas BBQ', 'Costillas de cerdo a la parrilla con salsa barbacoa', 18, true), 'Extra servilletas', 1, 18),
          new TicketItem(14, new Dish(14, 'Patatas Asadas', 'Patatas al horno con hierbas y especias', 8, false), 'Sin pimienta', 2, 8)
        ],
        comment: 'Grupo de compañeros de trabajo después de la jornada.',
        creationDate: '2024-04-01T20:45:00',
        delivered: false,
        waiter: new Waiter(7, 'Carlos', 'Gómez', 'carlos.gomez', 'password')
      }
    ]
      ;

    const tickets = mockTickets.map(ticket => new Ticket(
      ticket.id,
      ticket.table,
      ticket.ticketItems,
      ticket.comment,
      new Date(ticket.creationDate),
      ticket.delivered,
      ticket.waiter
    ));

    return tickets;
  }
}
export default TicketController;

import axios from 'axios';
import Ticket from '../models/Ticket';
import DiningTable from '../models/DiningTable';
import Waiter from '../models/Waiter';
import TicketItem from '../models/TicketItem';
import Dish from '../models/Dish';


class TicketController {
  constructor() {
    this.baseUrl = 'http://localhost/api/tickets';
  }
  async getAllTickets() {
    try {
      const response = await axios.get(this.baseUrl);
      const ticketsData = response.data;

      const tickets = ticketsData.map(ticketData => {
        const { id, diningTable, ticketItems, comment, creationDate, delivered, waiter } = ticketData;

        const diningTableObject = new DiningTable(diningTable.id, diningTable.tableType, diningTable.tableNumber);

        const ticketItemsArray = ticketItems.map(ticketItemData => {
          const { id, dish, comment } = ticketItemData;
          const dishObject = new Dish(dish.id, dish.name, dish.description, dish.price, dish.fixed);
          return new TicketItem(id, dishObject, comment);
        });

        const waiterObject = new Waiter(waiter.id, waiter.firstName, waiter.lastName, waiter.username, waiter.password);

        return new Ticket(id, diningTableObject, ticketItemsArray, comment, new Date(creationDate), delivered, waiterObject);
      });

      return tickets;
    } catch (error) {
      throw new Error('Error al obtener los tickets');
    }
  }
  async getAllTicketsOfToday() {
    try {
      const response = await axios.get(`${this.baseUrl}/today`);
      const ticketsData = response.data;

      const tickets = ticketsData.map(ticketData => {
        const { id, diningTable, ticketItems, comment, creationDate, delivered, waiter } = ticketData;

        const diningTableObject = new DiningTable(diningTable.id, diningTable.tableType, diningTable.tableNumber);

        const ticketItemsArray = ticketItems.map(ticketItemData => {
          const { id, dish, comment } = ticketItemData;
          const dishObject = new Dish(dish.id, dish.name, dish.description, dish.price, dish.fixed);
          return new TicketItem(id, dishObject, comment);
        });

        const waiterObject = new Waiter(waiter.id, waiter.firstName, waiter.lastName, waiter.username, waiter.password);

        return new Ticket(id, diningTableObject, ticketItemsArray, comment, new Date(creationDate), delivered, waiterObject);
      });

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
  async markTicketAsDelivered(ticketId) {
    try {
      await axios.put(`${this.baseUrl}/${ticketId}/delivered`);
    } catch (error) {
      throw new Error('Error al marcar el ticket como entregado');
    }
  }
}
export default TicketController;

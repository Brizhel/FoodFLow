class Ticket {
  constructor(id, diningTable, ticketItems, comment, creationDate, delivered, waiter) {
    this.id = id;
    this.diningTable = diningTable;
    this.ticketItems = ticketItems;
    this.comment = comment;
    this.creationDate = creationDate;
    this.delivered = delivered;
    this.waiter = waiter;
  }
}
export default Ticket;
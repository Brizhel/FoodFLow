class Ticket {
  constructor(id, table, ticketItems, comment, creationDate, delivered, waiter) {
    this.id = id;
    this.table = table;
    this.ticketItems = ticketItems;
    this.comment = comment;
    this.creationDate = creationDate;
    this.delivered = delivered;
    this.waiter = waiter;
  }
}
export default Ticket;
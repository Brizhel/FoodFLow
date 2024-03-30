class Ticket {
  constructor(id, table, orderItems, comment, creationDate, delivered, waiter) {
    this.id = id;
    this.table = table;
    this.ticketItems = orderItems;
    this.comment = comment;
    this.creationDate = creationDate;
    this.delivered = delivered;
    this.waiter = waiter;
  }
}
export default Ticket;
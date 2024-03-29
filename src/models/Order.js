class Order {
  constructor(id, table, orderItems, comment, creationDate, delivered, waiter) {
    this.id = id;
    this.table = table;
    this.orderItems = orderItems;
    this.comment = comment;
    this.creationDate = creationDate;
    this.delivered = delivered;
    this.waiter = waiter;
  }
}
export default Order;
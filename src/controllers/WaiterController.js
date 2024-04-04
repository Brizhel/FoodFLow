import axios from 'axios';
import Waiter from '../models/Waiter';

class WaiterController {
  constructor() {
    this.baseUrl = 'http://localhost/api/waiters';
  }

  async getAllWaiters() {
    try {
      const response = await axios.get(this.baseUrl);
      const waitersData = response.data;
      const waiters = waitersData.map(waiterData => new Waiter(
        waiterData.id,
        waiterData.firstName,
        waiterData.lastName,
        waiterData.username,
        waiterData.password
      ));
      return waiters;
    } catch (error) {
      throw new Error('Error al obtener los camareros');
    }
  }

  async createWaiter(waiter) {
    try {
      const response = await axios.post(this.baseUrl, waiter);
      const createdWaiter = new Waiter(
        response.data.id,
        response.data.firstName,
        response.data.lastName,
        response.data.username,
        response.data.password
      );
      return createdWaiter;
    } catch (error) {
      throw new Error('Error al crear el camarero');
    }
  }

  async updateWaiter(waiterId, updatedWaiter) {
    try {
      const response = await axios.put(`${this.baseUrl}/${waiterId}`, updatedWaiter);
      const updatedWaiterData = response.data;
      const updatedWaiterObject = new Waiter(
        updatedWaiterData.id,
        updatedWaiterData.firstName,
        updatedWaiterData.lastName,
        updatedWaiterData.username,
        updatedWaiterData.password
      );
      return updatedWaiterObject;
    } catch (error) {
      throw new Error('Error al actualizar el camarero');
    }
  }

  async deleteWaiter(waiterId) {
    try {
      await axios.delete(`${this.baseUrl}/${waiterId}`);
    } catch (error) {
      throw new Error('Error al eliminar el camarero');
    }
  }
  async getMockWaiters() {
    return [
      new Waiter(1, 'John', 'Doe', 'john.doe', 'password123'),
      new Waiter(2, 'Jane', 'Smith', 'jane.smith', 'password456'),
      new Waiter(3, 'David', 'Johnson', 'david.johnson', 'password789'),
    ];
  }
  
}

export default WaiterController;

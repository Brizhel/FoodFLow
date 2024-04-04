import axios from 'axios';
import Dish from "../models/Dish";
class DishController {
  constructor() {
    this.baseUrl = 'http://localhost/api/dishes';
  }

  async getAllDishes() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data.map(dish => new Dish(dish.id, dish.name, dish.description, dish.price, dish.fixed));
    } catch (error) {
      throw new Error('Error al obtener los platos');
    }
  }

  async createDish(dish) {
    try {
      const response = await axios.post(this.baseUrl, dish);
      return new Dish(response.data.id, response.data.name, response.data.description, response.data.price, response.data.fixed);
    } catch (error) {
      throw new Error('Error al crear el plato');
    }
  }

  async deleteDish(dishId) {
    if (!dishId) {
      throw new Error('ID de plato no válido');
    }

    try {
      await axios.delete(`${this.baseUrl}/${dishId}`);
    } catch (error) {
      throw new Error('Error al eliminar el plato');
    }
  }

  async updateDish(dishId, updatedDish) {
    if (!dishId || !updatedDish) {
      throw new Error('ID de plato o plato actualizado no válido');
    }

    try {
      const response = await axios.put(`${this.baseUrl}/${dishId}`, updatedDish);
      return new Dish(response.data.id, response.data.name, response.data.description, response.data.price, response.data.fixed);
    } catch (error) {
      throw new Error('Error al actualizar el plato');
    }
  }
}
export default DishController;

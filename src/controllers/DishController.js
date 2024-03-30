// DishController.js

class DishController {
  constructor() {
    this.baseUrl = '/api/dishes';
  }

  async getAllDishes() {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Error al obtener los platos');
    }
    return await response.json();
  }

  async createDish(dish) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dish)
    });
    if (!response.ok) {
      throw new Error('Error al crear el plato');
    }
    return await response.json();
  }
  async getMockDishes() {
    return [
      { id: 1, name: 'Plato 1', description: 'Descripción del plato 1', price: 10.99 },
      { id: 2, name: 'Plato 2', description: 'Descripción del plato 2', price: 12.99 },
      { id: 3, name: 'Plato 3', description: 'Descripción del plato 3', price: 8.99 },
    ];
  }
  async deleteDish(dishId) {
    if (!dishId) {
      throw new Error('ID de plato no válido');
    }

    const response = await fetch(`${this.baseUrl}/${dishId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el plato');
    }
  }
  async updateDish(dishId, updatedDish) {
    if (!dishId || !updatedDish) {
      throw new Error('ID de plato o plato actualizado no válido');
    }
  
    const response = await fetch(`${this.baseUrl}/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedDish)
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el plato');
    }
  
    return await response.json();
  }
}

export default DishController;

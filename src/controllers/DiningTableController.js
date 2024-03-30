// DiningTableController.js
import axios from 'axios';
import DiningTable from '../models/DiningTable';

class DiningTableController {
  constructor() {
    this.baseUrl = '/api/tables';
  }

  async getAllTables() {
    try {
      const response = await axios.get(this.baseUrl);
      const diningTablesData = response.data;
      const diningTables = diningTablesData.map(tableData => new DiningTable(
        tableData.id,
        tableData.tableType,
        tableData.tableNumber
        ));
      return diningTables;
    } catch (error) {
      throw new Error('Error al obtener las mesas');
    }
  }

  async createTable(table) {
    try {
      const response = await axios.post(this.baseUrl, table);
      const createdTableData = response.data;
      const createdTable = new DiningTable(
        createdTableData.id,
        createdTableData.tableType,
        createdTableData.tableNumber
      );
      return createdTable;
    } catch (error) {
      throw new Error('Error al crear la mesa');
    }
  }
  async getMockTables() {
    return [
      new DiningTable(1, 'Mesa', 1),
      new DiningTable(2, 'Barra', 1),
      new DiningTable(3, 'Terraza', 1),
    ];
  }
  async updateTable(tableId, updatedTable) {
    try {
      const response = await axios.put(`${this.baseUrl}/${tableId}`, updatedTable);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar la mesa');
    }
  }

  async deleteTable(tableId) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${tableId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar la mesa');
    }
  }
}

export default DiningTableController;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import DiningTableController from '../../controllers/DiningTableController';
import { usePage } from '../../PageContext';

function DiningTableView() {
  const { setCurrentPage } = usePage();
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTableId, setEditTableId] = useState(null);
  const [newTable, setNewTable] = useState({ id: null, tableType: '', tableNumber: 0 });
  const tableController = new DiningTableController();
  const handleCloseModal = () => {
    setShowModal(false);
    setEditTableId(null);
    setNewTable({ id: null, tableType: '', tableNumber: 0 });
  };

  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTable({ ...newTable, [name]: value });
  };

  const handleAddTable = async () => {
    try {
      let createdTable;
      if (editTableId) {
        await tableController.updateTable(editTableId, newTable);
        const updatedTables = tables.map(table => {
          if (table.id === editTableId) {
            return { ...newTable, id: editTableId };
          }
          return table;
        });
        setTables(updatedTables);
      } else {
        createdTable = await tableController.createTable(newTable);
        setTables([...tables, createdTable]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar o editar la mesa:', error);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      await tableController.deleteTable(id);
      setTables(tables.filter(table => table.id !== id));
      alert('Mesa eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la mesa:', error);
    }
  };

  const handleEditTable = (id) => {
    const tableToEdit = tables.find(table => table.id === id);
    setNewTable(tableToEdit);
    setEditTableId(id);
    handleShowModal();
  };


  useEffect(() => {
    const fetchTables = async () => {
      try {
        const allTables = await tableController.getAllTables();
        //const allTables = await tableController.getMockTables();
        setTables(allTables);
      } catch (error) {
        console.error('Error al obtener las mesas:', error.message);
      }
    };
    setCurrentPage('Mesas');
    fetchTables();
  }, []);
  return (
    <Container className='mt-5'>
      <Row>
        {tables.map(table => (
          <Col key={table.id} md={3} className="mb-3">
            <Card className="bg-darkgray1" text="white">
              <Card.Body>
                <Card.Title>{table.tableType}</Card.Title>
                <Card.Text>Número de mesa: {table.tableNumber}</Card.Text>
                <Button variant="primary" onClick={() => handleEditTable(table.id)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteTable(table.id)}>Borrar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Col md={12} className="mb-3">
        <Button variant="success" onClick={handleShowModal} style={{ fontSize: '2rem', width: '4rem', height: '4rem' }} className="rounded-circle btn-orange1 fixed-add-btn">&#43;</Button>
      </Col>
      <Modal contentClassName="bg-darkgray1" show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editTableId ? 'Editar Mesa' : 'Añadir Mesa'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTableType">
              <Form.Label>Tipo de Mesa</Form.Label>
              <Form.Control type="text" name="tableType" value={newTable.tableType} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formTableNumber">
              <Form.Label>Número de Mesa</Form.Label>
              <Form.Control type="text" name="tableNumber" value={newTable.tableNumber} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" className='btn-orange1' onClick={handleAddTable}>{editTableId ? 'Guardar cambios' : 'Añadir'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DiningTableView;

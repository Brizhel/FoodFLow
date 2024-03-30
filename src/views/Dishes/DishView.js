import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import DishController from '../../controllers/DishController';

function DishView() {
  const [dishes, setDishes] = useState([]);
  const dishController = new DishController();
  const [showModal, setShowModal] = useState(false);
  const [editDishId, setEditDishId] = useState(null);
  const [newDish, setNewDish] = useState({ id: null, name: '', description: '', price: 0, fixed: false });
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditDishId(null);
    setNewDish({ id: null, name: '', description: '', price: 0, fixed: false });
  };
  const handleShowModal = () => setShowModal(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDish({ ...newDish, [name]: value });
  };
  const handleAddDish = async () => {
    const fixedValue = newDish.fixed === "on" ? true : false;
    if (editDishId) {
      const updatedDish = { ...newDish, fixed: fixedValue };
      await dishController.updateDish(editDishId, updatedDish);
      const updatedDishes = dishes.map(dish => {
        if (dish.id === editDishId) {
          return { ...newDish, id: editDishId };
        }
        return dish;
      });
      setDishes(updatedDishes);
    } else {
      dishController.createDish(newDish);
      setDishes([...dishes, { ...newDish, id: dishes.length + 1 }]);
    }
    handleCloseModal(); // Cerrar el modal después de agregar/editar el plato
    setNewDish({ id: null, name: '', description: '', price: 0, fixed: false }); // Limpiar los campos del formulario
  };
  const handleDeleteDish = async (id) => {
    try {
      await dishController.deleteDish(id);
      setDishes(dishes.filter(dish => dish.id !== id));
      alert('Plato eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el plato:', error);
    }
  };
  
  const handleEditDish = (id) => {
    const dishToEdit = dishes.find(dish => dish.id === id);
    setNewDish(dishToEdit);
    setEditDishId(id);
    handleShowModal();
  };
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const allDishes = await dishController.getAllDishes();
        //const allDishes = await dishController.getMockDishes();
        setDishes(allDishes);
      } catch (error) {
        console.error('Error al obtener los platos:', error.message);
      }
    };

    fetchDishes();
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        {dishes.map(dish => (
          <Col key={dish.id} md={4} className="mb-3">
            <Card className="bg-darkgray1" text="white">
              <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text>Precio: {dish.price}</Card.Text>
                <Card.Text>¿Fijo?: {dish.fixed === 'on' ? 'Sí' : 'No'}</Card.Text>
                <Button variant="primary" onClick={() => handleEditDish(dish.id)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteDish(dish.id)}>Borrar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Col md={12} className="mb-3">
        <Button variant="success" onClick={handleShowModal} style={{ fontSize: '2rem', width: '4rem', height: '4rem' }} className="rounded-circle btn-orange1 fixed-add-btn">&#43;</Button>
      </Col>
      {/* Modal para añadir plato */}
      <Modal contentClassName="bg-darkgray1" show={showModal} onHide={handleCloseModal} closeButton={<button className="custom-close-button">×</button>}>
        <Modal.Header closeButton closeButtonClassName="custom-modal-close-btn">
          <Modal.Title>Añadir plato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={newDish.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="description" value={newDish.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="price" value={newDish.price} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formFixed">
              <Form.Check type="checkbox" label="Fijo" name="fixed"   checked={newDish.fixed === "on"} onChange={(event) => handleInputChange({ target: { name: 'fixed', value: event.target.checked ? 'on' : 'off' } })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="primary" className='btn-orange1'  onClick={handleAddDish}>{editDishId ? 'Guardar cambios' : 'Guardar'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DishView;

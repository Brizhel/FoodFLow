import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, onHide, onConfirm, message }) {
    return (
        <Modal contentClassName="bg-darkgray1" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title className="text-white">Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-white text-center" style={{ fontSize: '1.5rem' }}>
                {message}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={onConfirm}>Continuar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;

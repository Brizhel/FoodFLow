import React, { useState } from 'react';
import ConfirmationModal from './Modals/ConfirmationModal';

function useConfirmation() {
    const [showModal, setShowModal] = useState(false);
    const [confirmationCallback, setConfirmationCallback] = useState(() => () => { });

    const handleShowModal = (callback) => {
        setConfirmationCallback(() => callback);
        setShowModal(true);
        return new Promise((resolve) => {
            setConfirmationCallback(() => () => resolve(true));
        });
    };

    const handleConfirm = async () => {
        await confirmationCallback();
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const ConfirmationDialog = ({ message }) => (
        <ConfirmationModal
            show={showModal}
            onHide={handleCloseModal}
            onConfirm={handleConfirm}
            message={message}
        />
    );

    return { handleShowModal, ConfirmationDialog };
}

export default useConfirmation;

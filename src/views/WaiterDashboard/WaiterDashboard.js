// WaiterDashboard.js

import React, { useContext } from 'react';
import UserContext, { useUser } from '../../UserContext';

function WaiterDashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.role === 'ROLE_WAITER' && (
        <>
          {/* Componentes específicos para el rol de mesero */}
          <h2>Panel de Mesero</h2>
          {/* Otros componentes */}
        </>
      )}
      {user.role !== 'ROLE_WAITER' && (
        // Redirigir o mostrar un mensaje de acceso denegado
        <h2>Acceso Denegado</h2>
      )}
    </div>
  );
}

export default WaiterDashboard;

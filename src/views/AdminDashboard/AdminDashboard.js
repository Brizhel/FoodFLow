import React, { useContext} from 'react';
import UserContext from '../../UserContext';
import AdminLayout from './AdminLayout';
import AdminRoutes from './AdminRoutes';
function AdminDashboard() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      {user.role === 'ROLE_ADMIN' && (
        <AdminLayout>
          <AdminRoutes />
        </AdminLayout>
      )}
      {user.role !== 'ROLE_ADMIN' && (
        // Redirigir o mostrar un mensaje de acceso denegado
        <h2>Acceso Denegado</h2>
      )}
    </div>
  );
}

export default AdminDashboard;
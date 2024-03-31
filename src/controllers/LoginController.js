// LoginController.js

import axios from 'axios';

const LoginController = {
  login: async (username, password) => {
    try {
      // Realizar solicitud de inicio de sesión al servidor
      const response = await axios.post('/auth/login', { username, password });

      const { role, waiterId } = response.data;

      // Devolver el rol y el ID del mesero del usuario
      return { role, waiterId };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  }
};

export default LoginController;

// LoginController.js

import axios from 'axios';

const LoginController = {
  login: async (username, password) => {
    try {
      // Realizar solicitud de inicio de sesión al servidor
      const response = await axios.post('/auth/login', { username, password });
      
      // Extraer el rol del usuario de la respuesta del servidor
      const role = response.data.role;
      
      // Devolver el rol del usuario
      return role;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  }
};

export default LoginController;

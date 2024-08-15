// Exemplo de arquivo de serviço para chamadas à API
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchIncidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/incidents`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar incidentes:', error);
    throw error;
  }
};
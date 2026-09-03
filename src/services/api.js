import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const api = {
  getArticles: async (limit, offset) => {
    const response = await axios.get(`${API_BASE_URL}/article/${limit}/${offset}`);
    return response.data;
  },
  getArticleById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/article/${id}`);
    return response.data;
  },
  createArticle: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/article/`, data);
    return response.data;
  },
  updateArticle: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/article/${id}`, data);
    return response.data;
  },
  deleteArticle: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/article/${id}`);
    return response.data;
  }
};
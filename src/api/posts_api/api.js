import axios from "axios";

const api = axios.create({
  baseURL: " ",
  timeout: 5000,
});

export const getPost = async () => {
  try {
    const response = await api.get('');
    return response.data;

  } catch (error) {
    console.error(error)
    throw error;
  }
}
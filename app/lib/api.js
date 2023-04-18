import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {

  const response = await axios.post(`${API_URL}/api/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/login`, userData, {withCredentials:true});
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/api/logout`, null, { withCredentials: true });
  return response.data;
};

export const validateToken = async () => {
  const response = await axios.post(`${API_URL}/api/validate`,null, {withCredentials:true})
  return response.data
}
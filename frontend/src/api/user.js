import axiosInstance from '../utils/axiosInstance'

// Fetch user profile
export const getUserProfileApi = userId =>
  axiosInstance.get(`/users/${userId}`, { withCredentials: true })

// Update account details
export const updateUserApi = data =>
  axiosInstance.put('/users/update', data, { withCredentials: true })

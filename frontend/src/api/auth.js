import axiosInstance from '../utils/axiosInstance'

export const loginApi = credentials =>
  axiosInstance.post('/users/login', credentials, { withCredentials: true })

export const registerApi = userData =>
  axiosInstance.post('/users/register', userData, { withCredentials: true })

export const logoutApi = () =>
  axiosInstance.post('/users/logout', {}, { withCredentials: true })

export const refreshTokenApi = () =>
  axiosInstance.post('/users/refresh-token', {}, { withCredentials: true })

export const changePasswordApi = passwordData =>
  axiosInstance.post('/users/change-password', passwordData, {
    withCredentials: true
  })

export const getCurrentUserApi = () =>
  axiosInstance.get('/users/me', { withCredentials: true })

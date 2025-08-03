import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
})

// Interceptor only retries request, does not redirect
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        )

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed. Rejecting request.')
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance

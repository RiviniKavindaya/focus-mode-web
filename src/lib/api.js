import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const token = localStorage.getItem('token')

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const newToken = refreshResponse.data.access_token

        localStorage.setItem('token', newToken)

        originalRequest.headers.Authorization =
          `Bearer ${newToken}`

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('token')
        window.location.href = '/login'

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
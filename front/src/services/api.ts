import axios, { AxiosError } from 'axios'
import { useUiStore } from '@/stores/ui'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: import.meta.env.VITE_API_TOKEN
  },
})

// Intercepta requisições
api.interceptors.request.use(config => {
  const ui = useUiStore()
  ui.setLoading(true)
  return config
})

// Intercepta respostas com erro
api.interceptors.response.use(
  response => {
    const ui = useUiStore()
    ui.setLoading(false)
    return response
  },
  (error: AxiosError) => {
    const ui = useUiStore()
    ui.setLoading(false)

    if (error.response) {
      const message = error.message || 'Erro ao processar a requisição'
      ui.setError(message)
    } else {
      ui.setError('Erro de rede ou servidor indisponível')
    }

    return Promise.reject(error)
  }
)

export default api

import api from '@/services/api'
import { Exam } from '@/modules/exams/interfaces/Exam'

export async function fetchExams(): Promise<Exam[]> {
  const response = await api.get('/exams')
  return response.data.data
}

import api from '@/services/api'

export async function generateExamPdf(exams: string[]): Promise<Blob> {
  const response = await api.post('/exams/pdf', { exams }, {
    responseType: 'blob',
  })

  return response.data
}

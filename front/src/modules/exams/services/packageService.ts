import api, { ApiResponse } from '@/services/api'
import { Package } from '../interfaces/Package'
export async function fetchPackages(): Promise<Package[]> {
  const res = await api.get<ApiResponse<Package[]>>('/packages')
  return res.data.data
}

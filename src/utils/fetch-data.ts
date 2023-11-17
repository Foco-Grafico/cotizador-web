export const API_URL = 'http://192.168.0.10:3001'

export const DEVS_ENDPOINTS = {
  all: `${API_URL}/development`,
  one: (id: number | string) => `${API_URL}/development/${id}`
}

interface BATCH_ENDPOINTS_TYPES {
  inDev: ({ devID }: { devID: number | string, page?: number, elements?: number }) => string
  statuses: string
  types: string
}

export const BATCH_ENDPOINTS: BATCH_ENDPOINTS_TYPES = {
  inDev: ({ devID, elements = 50, page = 1 }) => `${API_URL}/batch/${devID}?elements=${elements}&page=${page}`,
  statuses: `${API_URL}/status/batch`,
  types: `${API_URL}/batch/types`
}

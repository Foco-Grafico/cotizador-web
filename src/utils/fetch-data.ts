export const API_URL = 'http://soportefoco.com:3001'

export const DEVS_ENDPOINTS = {
  all: `${API_URL}/development`
}

interface BATCH_ENDPOINTS_TYPES {
  inDev: ({ devID }: { devID: number | string, page?: number, elements?: number }) => string
}

export const BATCH_ENDPOINTS: BATCH_ENDPOINTS_TYPES = {
  inDev: ({ devID, elements = 50, page = 1 }) => `${API_URL}/batch/${devID}?elements=${elements}&page=${page}`
}

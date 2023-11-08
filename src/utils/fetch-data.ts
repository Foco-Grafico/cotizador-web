export const API_URL = 'http://127.0.0.1:3001'

export const DEVS_ENDPOINTS = {
  all: `${API_URL}/development`
}

export const BATCH_ENDPOINTS = {
  inDev: (devID: number | string) => `${API_URL}/batch/${devID}`
}

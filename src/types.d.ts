export interface Dev {
  id: number
  name: string
  description: string | null
  address: string
  city: string
  state: string
  country: string
  logo_url: string
  contact_number: string
  contact_email: string
  status: number
  view_url: string | null
  key: string
}

export interface Batch {
  'id': number
  'area': number
  'price': number
  'perimeter': number
  'longitude': number
  'coords': string
  'amenities': string
  'development_id': number
  'currency': string
  'location': string
  'sq_m': number
  'status': Status
  'key': string
  'assets': BatchAsset[]
  'payment_plans': []
}

export interface Status {
  id: number
  name: string
}

export interface StatusWithKey extends Status {
  key: string
}

export interface BatchAsset {
  id: number
  batch_id: number
  asset_url: string
}

export interface Filters {
  area?: number | string
  perimeter?: number | string
  longitude?: number | string
  coords?: string
  amenties?: string
  price?: number | string
  currency?: string
  location?: string
  sqm?: number | string
  sides?: number | string
}

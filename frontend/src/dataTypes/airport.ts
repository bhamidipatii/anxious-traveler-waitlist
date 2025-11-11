
export interface Airport {
    id: number
    name: string
    city: string
    country: string
    iata: string
    icao: string | null
    latitude: number | null
    longitude: number | null
  }
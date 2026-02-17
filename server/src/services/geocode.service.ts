import axios from 'axios'

interface Address {
  street: string
  city: string
  state?: string
  country: string
  postalCode?: string
}

export const getCoordinatesFromAddress = async (address: Address) => {
  const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
    {
      street: address.street,
      city: address.city,
      state: address.state || '',
      country: address.country,
      postalcode: address.postalCode || '',
      format: 'json',
      limit: '1',
    }
  ).toString()}`

  const response = await axios.get(geocodingUrl, {
    headers: {
      'User-Agent': 'Gemarse Estate(concierge@gemarseestate.com)',
    },
  })

  if (!response.data[0]?.lon || !response.data[0]?.lat) {
    return [0, 0]
  }

  return [parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)]
}

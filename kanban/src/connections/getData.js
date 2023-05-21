import axios from 'axios'

export const getData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/getdata')
    return response.data
  } catch (error) {
    throw error
  }
}

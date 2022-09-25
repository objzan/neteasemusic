import axios from 'axios'

const ajax = axios.create({
  baseURL: 'http://localhost:3000'
})

export default ajax

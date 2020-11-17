import axios from "axios"

const BASE_URL = "http://localhost:3000/users"
const CONFIG_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  "Content-Type": "application/json",
}

//temporary solution -- todo: study what the use of helmet() for..? check the Auth server
// Set config defaults when creating the instance
 const usersApi = axios.create({
  baseURL: BASE_URL,
  headers: CONFIG_HEADERS,
})
export default usersApi
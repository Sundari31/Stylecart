import axios from "axios";

const API = axios.create({
  baseURL: "https://stylecart-backend.onrender.com/api",
});

export default API;

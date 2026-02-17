import axios from "axios";

const API = axios.create({
  baseURL: "https://stylecart-1o36.onrender.com/api",
});

export default API;

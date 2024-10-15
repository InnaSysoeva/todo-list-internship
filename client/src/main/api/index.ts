import axios from "axios";

export const $host = axios.create({
  //baseURL: "http://localhost:3000/api",
  baseURL: "https://todo-list-internship-server.onrender.com/api"
});

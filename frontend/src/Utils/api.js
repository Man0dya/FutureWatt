import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:6001/api",  // Backend URL
});

export default instance;

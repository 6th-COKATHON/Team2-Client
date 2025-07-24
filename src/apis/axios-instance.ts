import axios from "axios";

const dummyBaseURL = "http://localhost:8080/";

export const baseAPI = axios.create({
  baseURL: dummyBaseURL,
});

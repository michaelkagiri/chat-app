import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Ensure backend supports credentials (cookies)
});

// Add a request interceptor to include the token
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token"); // Retrieve token from local storage
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
//     }
//     return config;
// });




// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
//   withCredentials: true,
// });
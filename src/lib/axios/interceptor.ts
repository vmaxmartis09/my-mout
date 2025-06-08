// lib/axios.ts
import axios from "axios";

// Tạo biến đếm để theo dõi request đang pending
let pendingRequestCount = 0;

// Tạo một custom event để giao tiếp
const emitLoadingEvent = (isLoading: boolean) => {
  const event = new CustomEvent("axios-loading", { detail: isLoading });
  window.dispatchEvent(event);
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // optional
});

console.log("nos ne:",instance);

instance.interceptors.request.use((config) => {
  pendingRequestCount++;
  emitLoadingEvent(true);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    pendingRequestCount--;
    if (pendingRequestCount === 0) emitLoadingEvent(false);
    return response;
  },
  (error) => {
    pendingRequestCount--;
    if (pendingRequestCount === 0) emitLoadingEvent(false);
    return Promise.reject(error);
  }
);

export default instance;
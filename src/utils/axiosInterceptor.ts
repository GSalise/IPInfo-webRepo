import axios from "axios";

export function axiosInterceptor(logout: () => void) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
}

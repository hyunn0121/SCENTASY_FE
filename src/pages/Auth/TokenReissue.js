import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/reissue`, {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

        // 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 원래 요청에 새 토큰 설정
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패: ", reissueError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;


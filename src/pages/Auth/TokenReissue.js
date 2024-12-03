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
      console.log("리이슈 요청");
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response = await apiClient.post(`/auth/reissue`, {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken,
        });

        if (response.status === 200) {
          const { code, data } = response.data;

          if(code === "0000") {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
            // 새 토큰 저장
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            console.log("리이슈 응답: ", response.data);

            // 원래 요청에 새 토큰 설정
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        }
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


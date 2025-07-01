import axios from "axios";
import callToken from "./callToken";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL, // CRA : API 기본 URL
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// 요청 인터셉터 - 스프링의 필터와 같은 역할을 함
// 요청이 있을때마다 가로채서 token 에 대한 처리를 해줌
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // ✅ 토큰 가져오기
      const token = await callToken();

      if (token) {
        // ✅ Authorization 헤더에 토큰 추가
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.error("토큰을 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("토큰 처리 중 오류 발생:", error);
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (선택 사항)
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (error.response && error.response.status === 401) {
      console.error("인증 오류: 토큰이 유효하지 않거나 만료되었습니다.");
      sessionStorage.removeItem("accessToken"); // 토큰 제거
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";

// 세션 스토리지에 저장되어 있는 토큰값을 반환
const callToken = async () => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    // console.log("기존 토큰 사용:", accessToken);
    return accessToken;
  }

  // 업체별로 부여된 id 와 secret 요청값
  // 지금은 로그인 페이지가 없어서 하드코딩으로 이부분을 처리했지만,(.env 같은 환경설정파일에 옮겨 놓고 사용) 
  // 실제 개발을 하게 되면 이 화면을 구현해서 토큰 발급처리를 해야 함
  try {
    console.log("토큰이 없으므로 새로 발급 요청...");
    const response = await axios.post(
      // `${import.meta.env.VITE_API_BASE_URL}/download?filename_org=${data.filename_org}&filename_real=${data.filename_real}`
      `${import.meta.env.VITE_API_BASE_URL}/auth`,
      {
        //client_id: import.meta.env.VITE_CLIENT_ID,
        client_id: "client_id",
        client_secret: "client_secret"
      }
    );

    // 세션 스토리지에 토큰값을 저장 ==> 세션 스토리지 동작하지 않는 예전 브라우저(IE)라면 
    // 해당 페이지를 사용할 수 없음, 주의 !!!
    if (response.status === 200) {
      const newToken = response.data.accessToken;
      sessionStorage.setItem("accessToken", newToken);
      console.log("새 토큰 발급 완료:", newToken);
      return newToken;
    } else {
      console.error("인증 실패");
      return null;
    }
  } catch (error) {
    console.error("토큰 요청 중 오류 발생:", error);
    return null;
  }
};

export default callToken;

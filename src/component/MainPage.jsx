import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/board/list");
  });
  return <></>;
};

export default MainPage;
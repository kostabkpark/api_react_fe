import { Routes, Route } from "react-router-dom";
import BoardList from "./component/board/BoardList.jsx";
import Regist from "./component/board/Regist.jsx";
import View from "./component/board/View.jsx";
import Edit from "./component/board/Edit.jsx";
import Reply from "./component/board/Reply.jsx";
import MainPage from "./component/MainPage.jsx";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/board/list" element={<BoardList />} />
      <Route path="/board/regist" element={<Regist />} />
      <Route path="/board/view" element={<View />} />
      <Route path="/board/edit" element={<Edit />} />
      <Route path="/board/reply" element={<Reply />} />
    </Routes>
  );
}

export default App;
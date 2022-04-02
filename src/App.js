// import css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/poppins";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TalentPool from "./pages/TalentPool";
import Questions from "./pages/Questions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talent-pool" element={<TalentPool />} />
        <Route path="/hire-developer" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

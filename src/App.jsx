import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import ContentWrapper from "./components/ContentWrapper";
import SingleCategories from "./components/SingleCategories";

function App() {
  return (
    <ContentWrapper>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" index />
          <Route element={<SingleCategories />} path="/:id" index />
        </Routes>
      </BrowserRouter>
    </ContentWrapper>
  );
}

export default App;

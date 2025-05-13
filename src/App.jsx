import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/Home";
import ContentWrapper from "./components/ContentWrapper";
import SingleCategories from "./screens/SingleCategories";
import SingleRecipe from "./screens/SingleRecipe";
import Search from "./screens/Search";

function App() {
  return (
    <ContentWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:categoryId"
            element={<SingleCategories />}
          ></Route>
          <Route path="recipe/:recipeId" element={<SingleRecipe />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ContentWrapper>
  );
}

export default App;

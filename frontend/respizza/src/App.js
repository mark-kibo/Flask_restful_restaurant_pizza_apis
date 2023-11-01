import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Restaurant from "./components/restaurantpage/Restaurant";
import Pizza from "./components/pizzapage/Pizza";

function App() {
  return (
    <div className="w-full">
      <Header/>
      <div className="w-full">
      <SearchBar/>
      </div>
      
      <Routes>
        <Route path="/" element={<Restaurant/>} />
        <Route path="/restaurants" element={<Restaurant/>} />
        <Route path="/pizza" element={<Pizza/>} />
      </Routes>
    </div>
  );
}

export default App;

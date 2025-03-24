/* eslint-disable no-irregular-whitespace */
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import IndividualCountry from "./pages/IndividualCountry.jsx";
import * as FaIcons from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <>
            
      <nav>
                
        <ul className="navbar">
                    
          <li>
                        <Link to="/">Where in the world ?</Link>
                      
          </li>
                    
          <li className="saved-container">
            <FaIcons.FaHeart />
                        <Link to="/SavedCountries">Saved Countries</Link>
                      
          </li>
          {/* <li>
            Dark Mode
          </li>          */}
        </ul>
              
      </nav>
            
      <Routes>
                
        <Route path="/" element={<Home />} />
                
        <Route path="/SavedCountries" element={<SavedCountries />} />
         {" "}
        <Route
          path="/IndividualCountry/:country"
          element={<IndividualCountry />}
        />
              
      </Routes>
          
    </>
  );
}
export default App;

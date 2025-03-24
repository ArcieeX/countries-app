/* eslint-disable no-irregular-whitespace */
// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import SavedCountries from "./pages/SavedCountries.jsx";
// import IndividualCountry from "./pages/IndividualCountry.jsx";
// import * as FaIcons from "react-icons/fa";
// import "./App.css";

// function App() {
//   return (
//     <>
//             
//       <nav>
//                 
//         <ul className="navbar">
//                     
//           <li>
//                         <Link to="/">Where in the world ?</Link>
//                       
//           </li>
//                     
//           <li className="saved-container">
//             <FaIcons.FaHeart />
//                         <Link to="/SavedCountries">Saved Countries</Link>
//                       
//           </li>
//           {/* <li>
//             Dark Mode
//           </li>          */}
//         </ul>
//               
//       </nav>
//             
//       <Routes>
//                 
//         <Route path="/" element={<Home />} />
//                 
//         <Route path="/SavedCountries" element={<SavedCountries />} />
//          {" "}
//         <Route
//           path="/IndividualCountry/:country"
//           element={<IndividualCountry />}
//         />
//               
//       </Routes>
//           
//     </>
//   );
// }
// export default App;

// import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SavedCountries from "./pages/SavedCountries.jsx";
import IndividualCountry from "./pages/IndividualCountry.jsx"
import * as FaIcons from "react-icons/fa";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Button , Box} from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode.jsx";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();
 

  return (
    <>
    <ErrorBoundary>
      <nav>
        <Box className="nav">
        <ul className="navbar">
          <li><Link to="/">Where in the world ?</Link></li>
          <li className="saved-container">
            <FaIcons.FaHeart />
            <Link to="/SavedCountries">Saved Countries</Link>
          </li>
          <li>
          <ColorModeButton><FaIcons.FaMoon /></ColorModeButton>
          </li>
        </ul>
        </Box>
      </nav>
      <Button onClick={() => navigate("/")}>Back</Button>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SavedCountries" element={<SavedCountries />} />
          <Route
            path="/IndividualCountry/:country"
            element={<IndividualCountry />}
          />
        </Routes>
      </ErrorBoundary>
     
    </>
  );
}
export default App;

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard.jsx";

const SavedCountries = () => {
  const [savedCountries, setSavedCountries] = useState([]);

  // Load saved countries from localStorage 
  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(storedCountries);
  }, []);



  return (                                                                                        
    <div>
      <h1>My Saved Countries</h1>
      {savedCountries.length > 0 ? (
        <div className="country-list">
          {savedCountries.map((country, index) => {
            console.log(country);
            return (
              <CountryCard key={index} country={country}/>
          )}
        )}
        </div>
      ) : (
        <p>No countries saved yet.</p>
      )}
      <Button>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default SavedCountries;

import CountryCard from "../components/CountryCard.jsx";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [originalData, setOriginalData] = useState([]); // Stores unfiltered API data
  const [data, setData] = useState([]); // Modifiable data for filtering
  const [regions, setRegions] = useState([]); // Unique regions
  const [selectedRegion, setSelectedRegion] = useState(""); // Selected region
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch API data (Only Once)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const result = await response.json();

        setOriginalData(result); // Store original API data
        setData(result); // Set data for display
        setLoading(false);

        // Extract unique regions
        const uniqueRegions = [...new Set(result.map((item) => item.region))];
        setRegions(uniqueRegions);
        localStorage.setItem("allCountries", JSON.stringify(result));
      } catch (error) {
        console.error(error);
        setError("Failed to fetch countries. Please try again later.");
        setLoading(false);
      }
    };
    if (!localStorage.getItem("allCountries")) {
      fetchData();
    } else {
      fetchData(JSON.parse(localStorage.getItem("allCountries")));
    }
  }, []);

  // Apply filters based on search or region
  useEffect(() => {
    let filtered = [...originalData]; // Start with original data

    if (selectedRegion) {
      filtered = filtered.filter((item) => item.region === selectedRegion);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setData(filtered); // Update display data
  }, [selectedRegion, searchTerm, originalData]);

  // Handle region selection
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  // Handle search bar term
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">
      <div className="home-components">
        <SearchBar onSearch={handleSearch} />
        {/* Region Dropdown */}
        <div
          className="dropdown-container"
          style={{ margin: "20px auto", maxWidth: "200px" }} >
          <NativeSelectRoot size="sm" width="240px">
            <NativeSelectField
              placeholder="Filter by Region"
              items={regions.map((region) => ({
                label: region,
                value: region,
              }))}
              onChange={handleRegionChange}
              value={selectedRegion}
            />
          </NativeSelectRoot>
        </div>
      </div>

      {/* Country List */}
      <div className="filtered-data">
        {data.length > 0 ? (
          <ul className="ul-grid">
            {data.map((item) => (
              <Link
                key={item.name.common}
                to={`/IndividualCountry/${item.name.common}`}
                state={{ country: item }} // Pass country data
              >
                <CountryCard  onClick={() => navigate("/IndividualCountry")} data={item} />
              </Link>
            ))}
          </ul>
        ) : (
          <p>No countries match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Home;


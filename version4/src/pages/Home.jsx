import { Link } from "react-router-dom";
import CountryCard from "../components/CountryCard.jsx";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";


const Home = () => {
  const [data, setData] = useState([]); // API data
  const [regions, setRegions] = useState([]); // Unique regions
  const [selectedRegion, setSelectedRegion] = useState(""); // Selected region
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on filters
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const result = await response.json();

        setData(result);
        setLoading(false);

        // Extract unique regions
        const uniqueRegions = [...new Set(result.map((item) => item.region))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch countries. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data whenever region or search term changes
  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchesRegion = selectedRegion
        ? item.region === selectedRegion
        : true;
      const matchesSearch = searchTerm
        ? item.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchesRegion && matchesSearch;
    });

    setFilteredData(filtered);
  }, [data, selectedRegion, searchTerm]);

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
          style={{ margin: "20px auto", maxWidth: "200px" }}
        >
          <NativeSelectRoot size="sm" width="240px">
            <NativeSelectField
              placeholder="Filter by Region"
              items={regions.map((region) => ({ label: region, value: region }))}
              onChange={handleRegionChange}
              value={selectedRegion}
            />
          </NativeSelectRoot>
        </div>
      </div>

      {/* Filtered Data Display */}
      <div className="filtered-data">
        {filteredData.length > 0 ? (
          <ul className="ul-grid">
            {filteredData.map((country, index) => (
              <CountryCard country={country} key={index} />
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


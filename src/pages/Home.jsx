import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../components/ui/native-select";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]); // API data
  const [regions, setRegions] = useState([]); // Unique regions
  const [selectedRegion, setSelectedRegion] = useState(""); // Selected region
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredData, setFilteredData] = useState([]); // Filtered data from API based on region and search

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const result = await response.json();

        setData(result);

        // Extract unique regions
        const uniqueRegions = [...new Set(result.map((item) => item.region))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <div className="home">
      <h1>Countries of the World</h1>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Region Dropdown */}
      <div style={{ margin: "20px auto", maxWidth: "300px" }}>
        <NativeSelectRoot size="sm" width="240px">
          <NativeSelectField
            placeholder="Filter by Region"
            items={regions}
            onChange={handleRegionChange}
            value={selectedRegion}
          />
        </NativeSelectRoot>
      </div>

      {/* Filtered Data Display */}
      <div className="filtered-data">
        {filteredData.length > 0 ? (
          <ul className="ul-grid">
            {filteredData.map((item, index) => (
              <Link key={index} to={`/IndividualCountry/${item.name.common}`}>
                <li key={item.name.common}>
                  <img src={item.flags.png} alt={item.flags.alt || "Flag"} />
                  <h2>{item.name.common}</h2>
                  <p>Population: {item.population.toLocaleString()}</p>
                  <p>Region: {item.region}</p>
                  <p>Capital: {item.capital?.join(", ") || "N/A"}</p>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

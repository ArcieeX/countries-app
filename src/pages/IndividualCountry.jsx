import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const IndividualCountry = () => {
  const { country } = useParams(); // Extract country name from the URL
  const [countryData, setCountryData] = useState(null);

  // Fetch data for the specific country
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        const result = await response.json();
        setCountryData(result[0]);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, [country]);

  if (!countryData) return <p>Loading...</p>;

  return (
    <div className="country-page">
      <h1>{countryData.name.common}</h1>
      <img src={countryData.flags.png} alt={countryData.flags.alt || "Flag"} />
      <p>Population: {countryData.population.toLocaleString()}</p>
      <p>Region: {countryData.region}</p>
      <p>Subregion: {countryData.subregion}</p>
      <p>Capital: {countryData.capital?.join(", ") || "N/A"}</p>
      <p>Languages: {Object.values(countryData.languages || {}).join(", ")}</p>
      <p>Currencies: {Object.values(countryData.currencies || {})
        .map((currency) => currency.name)
        .join(", ")}</p>
    </div>
  );
};

export default IndividualCountry;

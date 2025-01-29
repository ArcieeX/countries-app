
import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button.jsx";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const IndividualCountry = () => {
  const { country } = useParams(); // Extract country name from the URL
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]); // All countries data
  const [borderedCountries, setBorderedCountries] = useState([]); // Neighboring countries

  // Fetch data for the specific country and all countries
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Fetch all countries
        const response = await fetch("https://restcountries.com/v3.1/all");
        const allData = await response.json();
        setAllCountries(allData);

        // Fetch the specific country
        const countryResponse = await fetch(
          `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );
        const countryResult = await countryResponse.json();
        const selectedCountry = countryResult[0];
        setCountryData(selectedCountry);

        // Find bordered countries
        if (selectedCountry.borders) {
          const neighbors = selectedCountry.borders.map((code) =>
            allData.find((item) => item.cca3 === code)
          );
          setBorderedCountries(neighbors);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountryData();
  }, [country]);

  if (!countryData) return <p>Loading...</p>;

  return (
    <div className="country-page">
      <h1>Country Details</h1>
      {/* Card with Country Information */}
      <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m="auto" mt="4">
        <Image
          objectFit="fill"
          maxW="200px"
          src={countryData.flags.png}
          alt={countryData.flags.alt || `${countryData.name.common} Flag`}
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">{countryData.name.common}</Card.Title>
            <Card.Description>
              <p>
                <strong>Population:</strong>{" "}
                {countryData.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {countryData.region}
              </p>
            
              
              <p>
                <strong>Languages:</strong>{" "}
                {Object.values(countryData.languages || {}).join(", ")}
              </p>
             
            </Card.Description>
            <HStack mt="4">
              <Badge colorScheme="green">Population</Badge>
              <Badge colorScheme="blue">Region</Badge>
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button colorScheme="teal">Save</Button>
          </Card.Footer>
        </Box>
      </Card.Root>

      {/* Bordered Countries */}
      <div className="bordered-countries" style={{ marginTop: "20px" }}>
        <h2>Bordered Countries</h2>
        {borderedCountries.length > 0 ? (
          <ul style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {borderedCountries.map((neighbor, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <Link to={`/IndividualCountry/${neighbor.name.common}`}>
                  <Card.Root overflow="hidden" maxW="200px">
                    <Image
                      objectFit="fill"
                      maxW="100%"
                      src={neighbor.flags.png}
                      alt={neighbor.flags.alt || "Flag"}
                    />
                    <Box p="4">
                      <Card.Title>{neighbor.name.common}</Card.Title>
                    </Box>
                  </Card.Root>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bordering countries.</p>
        )}
      </div>
    </div>
  );
};

export default IndividualCountry;

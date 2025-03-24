
import { Badge, Text, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button.jsx";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const IndividualCountry = () => {
  const { country } = useParams(); // Extract country name from the URL
  const [countryData, setCountryData] = useState(null);
  const [borderedCountries, setBorderedCountries] = useState([]); // Neighboring countries
  const navigate = useNavigate();

  // Load country data from localStorage instead of fetching again
  useEffect(() => {
    const allCountries = JSON.parse(localStorage.getItem("allCountries")) || [];
    
    // Find the selected country from stored data
    const selectedCountry = allCountries.find(
      (c) => c.name.common.toLowerCase() === country.toLowerCase()
    );

    if (selectedCountry) {
      setCountryData(selectedCountry);

      // Find neighboring countries
      if (selectedCountry.borders?.length > 0) {
        const neighbors = selectedCountry.borders
          .map((code) => allCountries.find((item) => item.cca3 === code))
          .filter(Boolean); // Remove any undefined values
        setBorderedCountries(neighbors);
      }
    } else {
      console.error("Country not found in stored data.");
    }
  }, [country]);

  // Save the current country to localStorage
  const handleSaveCountry = () => {
    if (!countryData) return;

    const countryToSave = {
      name: countryData.name.common,
      flag: countryData.flags.png,
    };

    // Retrieve existing saved countries from localStorage
    const savedCountries =
      JSON.parse(localStorage.getItem("savedCountries")) || [];

    // Check if the country is already saved
    const isAlreadySaved = savedCountries.some(
      (c) => c.name === countryToSave.name
    );

    if (isAlreadySaved) {
      alert("This country is already saved.");
      return;
    }

    // Add the new country to the list
    const updatedCountries = [...savedCountries, countryToSave];
    localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
    alert(`${countryToSave.name} has been saved!`);
  };

  if (!countryData) return <p>Loading...</p>;

  return (
    <>
      <h1>Country Details</h1>
      <Box mb="4" 
        flexDirection="row"
        overflow="hidden"
        maxW="xl"
        m="auto"
        mt="4">
       
        <Link to="/SavedCountries" />
      
      {/* Card with Country Info */}
      <Card.Root
        flexDirection="row"
        overflow="hidden"
        maxW="xl"
        m="auto"
        mt="4"
      >
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
              <Text>
                <strong>Population:</strong>
                {countryData.population.toLocaleString()}
              </Text>
              <Text>
                <strong>Region:</strong> {countryData.region}
              </Text>
              <Text>
                <strong>Capital:</strong>{countryData.capital}
              </Text>
            </Card.Description>
            <HStack mt="3">
              <Text fontWeight="bold">Bordered Countries: 
              {borderedCountries.length > 0 ? (
                borderedCountries.map((neighbor) => (
                  <Badge key={neighbor.name.common} color="blue" variant="outline">
                    {neighbor.cca3}
                  </Badge>
                ))
              ) : (
                <Badge colorScheme="red">No bordering countries.</Badge>
              )}
              </Text>
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => {
                handleSaveCountry();
                navigate("/SavedCountries");
              }}
            >
              Save
            </Button>
          </Card.Footer>
        </Box>
      </Card.Root>
      </Box>
    </>
  );
};

export default IndividualCountry;

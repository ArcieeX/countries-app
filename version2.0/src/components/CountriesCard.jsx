import { Box, Card, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";

const CountriesCard = ({ data }) =>  {

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

   // Load click count from localStorage when component mounts
   useEffect(() => {
    const savedCountries = JSON.parse(localStorage.getItem("SavedCountries")) || [];
    const savedCountry = savedCountries.find((country) => country.name === data.name.common);
    if (savedCountry) {
      setClickCount(savedCountry.clickCount || 0); 
    }
  }, [data.name.common]); 

  const handleClickCount = () => {
    let savedCountries = JSON.parse(localStorage.getItem("SavedCountries")) || [];
    let countryIndex = savedCountries.findIndex((country) => country.name === data.name.common);

    if (countryIndex === -1) {
      let newCountry = { ...data, clickCount: 1 }; // Create a new object to avoid mutating data
      savedCountries.push(newCountry);
      setClickCount(1);
    } else {
      savedCountries[countryIndex].clickCount = (savedCountries[countryIndex].clickCount || 0) + 1;
      setClickCount(savedCountries[countryIndex].clickCount); // Update UI state
    }

    localStorage.setItem("SavedCountries", JSON.stringify(savedCountries));
    console.log("Country saved!");
  };

  return (
    <Card.Root flexDirection="column" overflow="hidden" maxW="sm" m="auto" mt="4" mb={4}>
      <Image
        fit="cover"
        height="200px"
        src={data.flags.png}
        alt={data.flags.alt || `${data.name.common} Flag`}
        borderRadius="md"
        mb={0}
      />
      <Box borderRadius="sm" shadow="md" maxW="300px">
        <Card.Body maxW="250px">
          <Card.Title fontSize="md" fontWeight="bold" mb={2}>
            {data.name.common}
          </Card.Title>
          <Card.Description>
            <Text mb={1}><strong>Region:</strong> {data.region}</Text>
            <Text mb={1}><strong>Population:</strong> {data.population.toLocaleString()}</Text>
            <Text mb={1}><strong>Capital:</strong> {data.capital ? ` ${data.capital}` : "No capital info"}</Text>
      
        <Text fontSize="sm" color="gray.500" mt={2}>
           {clickCount} {data.clickCount === 1 ? "time" : "times"}
        </Text>

        <Text fontSize="sm" color="gray.500" mt={2}>
          Saved {clickCount} {clickCount === 1 ? "time" : "times"}
        </Text>
          </Card.Description>
        </Card.Body>
        <Button
          mt={3}
          colorScheme="blue"
          width="100%"
          onClick={() => {
            handleClickCount();
            navigate("/SavedCountries");
          }}
        >
          <FaIcons.FaHeart />
        </Button>
      </Box>
    </Card.Root>
  );
};
export default CountriesCard;



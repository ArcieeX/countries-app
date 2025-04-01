import { Box, Card, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import * as FaIcons from "react-icons/fa";
/* eslint-disable react/prop-types */

const CountriesCard = ({ data }) =>  {

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
    
  // Load click count from localStorage when component mounts
  useEffect(() => {
    const savedCountries = JSON.parse(localStorage.getItem("SavedCountries")) || [];
    const savedCountry = savedCountries.find(
      (country) => country.name.common === data.name.common
    );
    if (savedCountry) {
      setClickCount((savedCountry.clickCount || 0) + 1);
    }
  }, [data.name.common]);
  // Save updated click count to localStorage when a country is clicked
  const handleClickCount = () => {
    const savedCountries = JSON.parse(localStorage.getItem("SavedCountries")) || [];
    const countryIndex = savedCountries.findIndex(
      (country) => country.name.common === data.name.common
    );
    if (countryIndex === -1) {
      // Create a new object to avoid mutation
      const newCountry = { ...data, clickCount: 1 };
      savedCountries.push(newCountry);
      setClickCount(1);
    } else {
      savedCountries[countryIndex].clickCount =
        (savedCountries[countryIndex].clickCount || 0) + 1;
      setClickCount(savedCountries[countryIndex].clickCount);
    }
    localStorage.setItem("SavedCountries", JSON.stringify(savedCountries));
    console.log("Country saved!");
  };

  return (
    <Card.Root flexDirection="column" overflow="hidden" maxW="sm" m="auto" mt="4" mb={4} onClick={() => handleClickCount(data)}>
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
          
          <ul>
            <Box as="li" mb={1}><strong>Population:</strong> {data.population.toLocaleString()}</Box>
            <Box as="li" mb={1}><strong>Capital:</strong> {data.capital ? ` ${data.capital}` : "No capital info"}</Box>
            <Box as="li" mb={1}><strong>Click Count:</strong> {clickCount}</Box>
            <Box as="li" mb={1}><strong>Region:</strong> {data.region}</Box>
          </ul>
          <Button
          mt={3}
          color="red.600"
          width="100%"
          onClick={() => {
            handleClickCount();
            navigate("/SavedCountries");
          }}
        >
          <FaIcons.FaHeart />
        </Button>  
        </Card.Body>
       
        
      </Box>
    </Card.Root>
  );
};
export default CountriesCard;


// CountriesCard.propTypes = {
//   data: PropTypes.shape({
//     name: PropTypes.shape({
//       common: PropTypes.string.isRequired,
//     }).isRequired,
//     flags: PropTypes.shape({
//       png: PropTypes.string.isRequired,
//       alt: PropTypes.string,
//     }).isRequired,
//     population: PropTypes.number.isRequired,
//     region: PropTypes.string.isRequired,
//     capital: PropTypes.arrayOf(PropTypes.string),
//     clickCount: PropTypes.number,
//   }).isRequired,
// };

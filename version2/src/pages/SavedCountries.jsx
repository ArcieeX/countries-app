
import { useEffect, useState } from "react";
import { Box, Image, Button, Text } from "@chakra-ui/react";
import ContactForm from '../components/ContactForm';



const SavedCountries = () => {
  const [savedCountries, setSavedCountries] = useState([]);

  // Load saved countries from localStorage
  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem("savedCountries")) || [];
    setSavedCountries(storedCountries);
  }, []);

  // Remove a saved country
  const handleRemoveCountry = (name) => {
    const updatedCountries = savedCountries.filter((country) => country.name !== name);
    setSavedCountries(updatedCountries);
    localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
  };

  return (
    <Box p={4}>
      <Box>

      <Text fontWeight="bold" >My Saved Countries</Text>
      {savedCountries.length === 0 ? (
        <Text fontWeight="bold" >No saved countries yet.</Text>
      ) : (
        savedCountries.map((country, index) => (
          <Box key={index} borderWidth="1px" p={3} m={2} display="flex" alignItems="center">
            
            <Image src={country.flag} alt={country.name} boxSize="50px" mr={4} />
            <Text fontWeight="bold">{country.name}</Text>
            <Button ml="auto" colorScheme="red" onClick={() => handleRemoveCountry(country.name)}>
              Remove
            </Button>
          </Box>
        ))
      )}
       <div>
          <Text fontWeight="bold">My Profile</Text>
          <ContactForm />
        </div>
        </Box>
    </Box>  
       
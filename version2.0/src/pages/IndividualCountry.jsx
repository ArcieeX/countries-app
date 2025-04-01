import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button.jsx";
import { useParams, Link ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";


const IndividualCountry = () => {
  const { country } = useParams(); // Extract country name from the URL
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]); // All countries data
  const [borderedCountries, setBorderedCountries] = useState([]); // Neighboring countries
  const navigate = useNavigate();

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
            <Card.Title mb="4">{countryData.name.common}</Card.Title>
            <p> <strong>Population:</strong>{" "}{countryData.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {countryData.region}</p>
            <p><strong>Languages:</strong>{" "}{Object.values(countryData.languages || {}).join(", ")}</p>
            <div className="bordered-countries" style={{ marginTop: "10px" }}>
              <h2><strong>Bordering Countries:</strong></h2>
              {borderedCountries.length > 0 ? (
                <ul style={{ display: "flex", gap: "10px"}}>
                  {borderedCountries.map((neighbor, index) => (
                    <li key={index} style={{ listStyle: "none" }}>
                      <Link to={`/IndividualCountry/${neighbor.name.common}`}>
                        <Badge>{neighbor.name.common}</Badge> 
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Badge>No bordering countries.</Badge>
              )}
            </div>
          </Card.Body>
          <Card.Footer>
            <Button colorScheme="teal" onClick={() => {
            navigate("/SavedCountries");
          }}>Save</Button>
          </Card.Footer>
        </Box>
      </Card.Root>

      {/* Bordered Countries */}
    </div>
  );
};

export default IndividualCountry;




// import { Badge, Text, Box, Card, HStack, Image } from "@chakra-ui/react";
// import { Button } from "../components/ui/button.jsx";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const IndividualCountry = () => {
//   const { country } = useParams(); // Extract country name from the URL
//   const [countryData, setCountryData] = useState(null);
//   const [borderedCountries, setBorderedCountries] = useState([]); // Neighboring countries
//   const navigate = useNavigate();

//   // Load country data from localStorage instead of fetching again
//   useEffect(() => {
//     const allCountries = JSON.parse(localStorage.getItem("allCountries")) || [];

//     // Find the selected country from stored data
//     const selectedCountry = allCountries.find(
//       (c) => c.name.common.toLowerCase() === country.toLowerCase()
//     );

//     if (selectedCountry) {
//       setCountryData(selectedCountry);

//       // Find neighboring countries
//       if (selectedCountry.borders?.length > 0) {
//         const neighbors = selectedCountry.borders
//           .map((code) => allCountries.find((item) => item.cca3 === code))
//           .filter(Boolean); // Remove any undefined values
//         setBorderedCountries(neighbors);
//       }
//     } else {
//       console.error("Country not found in stored data.");
//     }
//   }, [country]);

//   // Save the current country to localStorage
//   const handleSaveCountry = () => {
//     if (!countryData) return;

//     const countryToSave = {
//       name: countryData.name.common,
//       flag: countryData.flags.png,
//     };

//     // Retrieve existing saved countries from localStorage
//     const savedCountries =
//       JSON.parse(localStorage.getItem("savedCountries")) || [];

//     // Check if the country is already saved
//     const isAlreadySaved = savedCountries.some(
//       (c) => c.name === countryToSave.name
//     );

//     if (isAlreadySaved) {
//       alert("This country is already saved.");
//       return;
//     }

//     // Add the new country to the list
//     const updatedCountries = [...savedCountries, countryToSave];
//     localStorage.setItem("savedCountries", JSON.stringify(updatedCountries));
//     alert(`${countryToSave.name} has been saved!`);
//   };

//   if (!countryData) return <p>Loading...</p>;

//   return (
//     <>
//       <h1>Country Details</h1>
//       <Box mb="4"
//         flexDirection="row"
//         overflow="hidden"
//         maxW="xl"
//         m="auto"
//         mt="4">

//         <Link to="/SavedCountries" />

//       {/* Card with Country Info */}
//       <Card.Root
//         flexDirection="row"
//         overflow="hidden"
//         maxW="xl"
//         m="auto"
//         mt="4"
//       >
//         <Image
//           objectFit="fill"
//           maxW="200px"
//           src={countryData.flags.png}
//           alt={countryData.flags.alt || `${countryData.name.common} Flag`}
//         />
//         <Box>
//           <Card.Body>
//             <Card.Title mb="2">{countryData.name.common}</Card.Title>
//             <Card.Description>
//               <Text>
//                 <strong>Population:</strong>
//                 {countryData.population.toLocaleString()}
//               </Text>
//               <Text>
//                 <strong>Region:</strong> {countryData.region}
//               </Text>
//               <Text>
//                 <strong>Capital:</strong>{countryData.capital}
//               </Text>
//             </Card.Description>
//             <HStack mt="3">
//               <Text fontWeight="bold">Bordered Countries:
//               {borderedCountries.length > 0 ? (
//                 borderedCountries.map((neighbor) => (
//                   <Badge key={neighbor.name.common} color="blue" variant="outline">
//                     {neighbor.cca3}
//                   </Badge>
//                 ))
//               ) : (
//                 <Badge colorScheme="red">No bordering countries.</Badge>
//               )}
//               </Text>
//             </HStack>
//           </Card.Body>
//           <Card.Footer>
//             <Button
//               onClick={() => {
//                 handleSaveCountry();
//                 navigate("/SavedCountries")
//               }}
//             >
//               Save
//             </Button>
//           </Card.Footer>
//         </Box>
//       </Card.Root>
//       </Box>
//     </>
//   );
// };

// export default IndividualCountry;

// /* eslint-disable react/prop-types */
// // import { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { Button } from "../components/ui/button";
// // // import PropTypes from 'prop-types';
// // import { Box, Card, HStack, Image, Text } from "@chakra-ui/react"

// // function IndividualCountry({ countries, setFavorites }) {
// //   // Get the country ID from the URL parameters
// //   const { id } = useParams();
// //   // Hook to navigate programmatically
// //   const navigate = useNavigate();
// //   const country = countries.find((c) => c.cca3 === id);
// //   const [borderCountries, setBorderCountries] = useState([]);
// //   const [clickCount, setClickCount] = useState(0);

// //   useEffect(() => {
// //     const fetchBorderCountries = () => {
// //       if (country && country.borders) {
// //         const borderData = country.borders.map(borderCode => {
// //           const borderCountry = countries.find(c => c.cca3 === borderCode);
// //           return borderCountry ? borderCountry.name.common : null;
// //         }).filter(Boolean);
// //         setBorderCountries(borderData);
// //       } else {
// //         setBorderCountries([]);
// //       }
// //     };

// //     fetchBorderCountries();
// //   }, [country, countries]);

// //   useEffect(() => {
// //     // Retrieve click count from local storage
// //     const storedClicks = JSON.parse(localStorage.getItem('timesClicked')) || {};
// //     setClickCount(storedClicks[id] || 0);
// //   }, [id]);

// //   if (!country) return <p>Country not found.</p>;

// //   // Function to handle back button click
// //   const handleBackClick = () => {
// //     navigate(-1); // Navigate back to the previous page
// //   };

// //   const handleSaveClick = () => {
// //     const storedProfile = localStorage.getItem('profile');
// //     if (!storedProfile) {
// //       alert('You are not logged in. Please log in on the Saved Countries page to save your countries.');
// //       return;
// //     }
// //     try {
// //       const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// //       // Check if country already exists
// //       if (existingFavorites.some(fav => fav.cca3 === country.cca3)) {
// //         alert('This country is already in your favorites!');
// //         return;
// //       }

// //       // Add new country to favorites
// //       const updatedFavorites = [...existingFavorites, country];

// //       // Save to localStorage
// //       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

// //       // Update UI state
// //       setFavorites(updatedFavorites);

// //       alert('Country saved to favorites!');
// //     } catch (error) {
// //       console.error('Error saving to favorites:', error);
// //       alert('Failed to save country to favorites');
// //     }
// //   };

// //   return (
// //     <>
// //       <div>
// //         <Button className="BackButton" onClick={handleBackClick}>Back</Button>
// //       </div>
// //       <Card.Root flexDirection="row" overflow="hidden" maxW="80%" placeSelf="center">
// //         <Image
// //           objectFit="cover"
// //           maxW="50%"
// //           src={country.flags.png}
// //           alt="Image of {country.name.common}"
// //         />
// //         <Box display="flex" flexDirection="row" justifyContent="space-between" p="4" flexWrap="wrap" >
// //           <Card.Body >
// //             <Card.Title mb="2">{country.name.common}</Card.Title>
// //             <HStack>
// //               <ul>
// //                 <li>Population: {country.population}</li>
// //                 <li>Region: {country.region}</li>
// //                 <li>Capital: {country.capital}</li>
// //                 <li className="numberTimesClicked">Search For: {clickCount} times</li>
// //               </ul>
// //             </HStack>
// //             <HStack mt="4" flexWrap="wrap">
// //               <Text fontWeight="semibold" textStyle="xl">
// //                 Border Countries:
// //               </Text>
// //               {borderCountries.length > 0 ? (
// //                 borderCountries.map((borderCountry, index) => (
// //                   <span key={index}>{borderCountry}</span>
// //                 ))
// //               ) : (
// //                 <span>None</span>
// //               )}
// //             </HStack>
// //           </Card.Body>
// //           <Card.Footer>
// //             <Button onClick={handleSaveClick}>Save</Button>
// //           </Card.Footer>
// //         </Box>
// //       </Card.Root>

// //     </>
// //   );
// // };

// // // Country.propTypes = {
// // //   countries: PropTypes.arrayOf(PropTypes.shape({
// // //     cca3: PropTypes.string.isRequired,
// // //     name: PropTypes.shape({
// // //       common: PropTypes.string.isRequired,
// // //     }).isRequired,
// // //     population: PropTypes.number.isRequired,
// // //     region: PropTypes.string.isRequired,
// // //     capital: PropTypes.arrayOf(PropTypes.string),
// // //     flags: PropTypes.shape({
// // //       png: PropTypes.string.isRequired,
// // //     }).isRequired,
// // //     borders: PropTypes.arrayOf(PropTypes.string),
// // //   })).isRequired,
// // //   setFavorites: PropTypes.func.isRequired,
// // // };

// // export default IndividualCountry;

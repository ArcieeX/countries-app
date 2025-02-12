/* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function CountryCard(props) {
//   const [country, setCountry] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (props.data) {
//       setCountry(props.data);
//     }
//   }, [props.data]);

//   return country ? (
//     <>
//       <Link to={`/IndividualCountry/${country.name.common}`}>
//         <li className="card">
//           {/* ✅ Safe access using optional chaining */}
//           <img src={country?.flags?.png || ""} alt={country?.flags?.alt || "Flag"} />
//           <h2>{country?.name?.common}</h2>
//           <p>Population: {country?.population?.toLocaleString() || "N/A"}</p>
//           <p>Region: {country?.region || "N/A"}</p>
//           <p>Capital: {country?.capital?.join(", ") || "N/A"}</p>
//         </li>
//         <Button onClick={() => navigate("/SavedCountries")}
//             >
//               Save
//             </Button>
//       </Link>
//     </>
//   ) : (
//     <p>Loading...</p>
//   );
// }

// export default CountryCard;

// import { useLocation, useNavigate } from "react-router-dom";

// const IndividualCountry = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const country = location.state?.country; // Get country data from state

//   const handleClick = () => {
//     navigate(`/IndividualCountry/${country.name.common}`, { state: { country } });
//   };

//   if (!country) {
//     return <p>No country data available. <button onClick={() => navigate("/")}>Go Back</button></p>;
//   }

//   return (
//     <div onClick={handleClick}>
//       <h1>{country.name.common}</h1>
//       <img src={country.flags.png} alt={`${country.name.common} flag`} />
//       <p>Population: {country.population.toLocaleString()}</p>
//       <p>Region: {country.region}</p>
//       <p>Capital: {country.capital?.join(", ") || "N/A"}</p>
//       <button onClick={() => navigate("/")}>Go Back</button>
//     </div>
//   );
// };



import { Box, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";

const CountryCard = ({ data }) => {
  const navigate = useNavigate();
  


  const handleSaveCountry = () => {
    let savedCountries = JSON.parse((localStorage.getItem("SavedCountries"))) || [];
    let countryIndex = savedCountries.findIndex((country) => country.name === data.name.common);

    if (countryIndex === -1) {
      data.clickCount = 1;
      savedCountries.push(data);
    }else {
      savedCountries[countryIndex].clickCount = (savedCountries[countryIndex].clickCount || 0) + 1;
    
    }
    localStorage.setItem("SavedCountries", JSON.stringify(savedCountries));
    // Implement save country logic here
    console.log("Country saved!");
  };

  return (
    
      <Card.Root  flexDirection="column" overflow="hidden" maxW="sm" m="auto" mt="4" mb={4}>

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
        </Card.Description>
        </Card.Body>
        <Button
          onClick={() => {
            handleSaveCountry();
            navigate("/SavedCountries");
          }}
        >
          Save
        </Button>
      </Box>
    </Card.Root>
   
  );
};

export default CountryCard;





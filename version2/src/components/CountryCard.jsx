
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/IndividualCountry/${country.name.common}`}
      key={country}
    >
      <li className="card">
        <img src={country.flags.png} alt={country.flags.alt || "Flag"} />

        <h2>{country.name.common}</h2>
        <p>Population: {country.population?.toLocaleString() || "N/A"}</p>
        <p>Region: {country.region || "N/A"}</p>
        <p>Capital: {country.capital?.join(", ") || "N/A"}</p>
      </li>
    </Link>
  );
};
export default CountryCard;

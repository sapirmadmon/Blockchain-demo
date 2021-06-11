import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <ul id="nav">
        <li key="/">
          <Link to="/">Home</Link>
        </li>
        {props.listCityName.map((cityName) => (
          <li key={cityName}>
            <Link to={"/" + cityName}>{cityName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;

import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  const linksArr = ["Hash", "Block", "Blockchain", "Distributed"];
  return (
    <div>
      <ul id="nav">
        <li key="/">
          <Link to="/">Home</Link>
        </li>
        {linksArr.map((link, index) => (
          <li key={index}>
            <Link to={"/" + link}>{link}</Link>
          </li>
        ))}
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

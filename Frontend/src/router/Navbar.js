import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <ul id="nav">
        <li key="/">
          <Link to="/">Home</Link>
        </li>
        <li key="/3">
          <Link to="/hash">Hash</Link>
        </li>
        <li key="/1">
          <Link to="/block">Block</Link>
        </li>
        <li key="/4">
          <Link to="/blockchain">Blockchain</Link>
        </li>
        <li key="/4">
          <Link to="/distributed">Distributed </Link>
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

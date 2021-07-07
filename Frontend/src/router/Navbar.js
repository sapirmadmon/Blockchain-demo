import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  const linksArr = [
    "Hash",
    "Block",
    "Blockchain",
    "Distributed",
    "Tokens",
    "Coinbase",
    "Keys",
    "Signatures",
    "Transaction",
    "Blockchain-2",
  ];
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
      </ul>
    </div>
  );
}

export default Navbar;

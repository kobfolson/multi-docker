import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div style={{ margin: "20px auto" }}>
          <Link style={linkStyle} to="/">
            Home
          </Link>
          <Link style={linkStyle} to="/otherpage">
            OtherPage
          </Link>
        </div>
        <h1>Fibonacci Calculator</h1>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
};

const linkStyle = {
  textDecoration: "none",
  marginRight: "10px",
  color: "black",
};

export default App;

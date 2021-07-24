import logo from './logo.svg';
import './App.css';
import IsLoggedIn from "./components/auth/IsLoggedIn";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <IsLoggedIn/>
      </header>
    </div>
  );
}

export default App;

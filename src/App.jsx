import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";

function App() {
  return (
    <div className="bg-blue-400">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

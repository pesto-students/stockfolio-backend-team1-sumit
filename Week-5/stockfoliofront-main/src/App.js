import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Discover from "./pages/DiscoverPage/index.js";
import Signin from "./pages/User/Signin/Signin.js";
import SignUp from "./pages/User/Signup/Signup.js";
import ItDashboard from "./pages/Dashboard/BlockDashboard/ItDashboard/index.js";
import DividendDashboard from "./pages/Dashboard/BlockDashboard/DividendDashboard/index.js";
import Watchlist from "./components/Watchlist/Watchlist.js";

export const store = React.createContext({});

function App() {
  const [token, setToken] = useState(0);

  return (
    <div className="App">
      <store.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/discover" element={<Discover />} />
            <Route exact path="/Signin" element={<Signin />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/itdashboard" element={<ItDashboard />} />
            <Route exact path="/watchlist" element={<Watchlist />} />

            <Route
              exact
              path="/dividenddashboard"
              element={<DividendDashboard />}
            />
          </Routes>
        </BrowserRouter>
      </store.Provider>
    </div>
  );
}

export default App;

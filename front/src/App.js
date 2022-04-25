import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./routes";
import { useFetchData } from "./components/custom/fetchData";
import "./App.css";

// useContext
export const StoreContext = React.createContext();

function App() {
  const { data, loading } = useFetchData();

  return (
    <Router>
      <div className="App">
        <StoreContext.Provider value={data}>
          <MainRoutes loading={loading} />
        </StoreContext.Provider>
      </div>
    </Router>
  );
}

export default App;

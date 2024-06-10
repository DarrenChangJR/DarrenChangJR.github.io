import { Routes, Route } from "react-router-dom";
import Iframe from "react-iframe";

function Visualisation() {
  return (
    <Routes>
      <Route
        path="property-prices"
        element={<Iframe url="./district.html" width="100%" height="100%" />}
      />
    </Routes>
  );
}

export default Visualisation;

import { Routes, Route } from "react-router-dom";
import Poems from "./Poems";
import Learning from "./Learning";

function Literature() {
  return (
    <Routes>
      <Route path="learning" element={<Learning />} />
      <Route path="poems/*" element={<Poems />} />
    </Routes>
  );
}

export default Literature;

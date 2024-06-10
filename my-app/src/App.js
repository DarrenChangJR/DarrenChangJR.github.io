// App.js
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Visualisation from './visualisation/Visualisation';
import Literature from './literature/Literature';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/visualisation/*" element={<Visualisation />} />
          <Route path="/literature/*" element={<Literature />} />
          <Route path="/" element={<Navigate replace to="/literature/poems" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
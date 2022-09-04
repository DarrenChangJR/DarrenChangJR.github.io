import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Blog from './blog/Blog';
import Resume from './resume/Resume';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/" element={<Navigate replace to="/resume" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

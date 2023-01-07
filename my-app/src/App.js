import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Blog from './blog/Blog';
import Resume from './resume/Resume';
import Poems from './literature/Poems';
import Learning from './literature/Learning';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/blog/*" element={<Blog />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/literature/learning" element={<Learning />} />
          <Route path="/literature/poems/*" element={<Poems />} />
          <Route path="/" element={<Navigate replace to="/resume" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

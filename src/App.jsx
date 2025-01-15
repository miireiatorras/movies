/**
 * Main Goal:
 * The App component serves as the main container for the application.
 * - It uses React Router to manage navigation between pages.
 * - Includes global components like Navbar and Footer for consistent layout.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './features/footer/Footer.jsx';
import Navbar from './features/navbar/Navbar.jsx';
import Main from './features/main/Main.jsx';
import ResultsPage from './pages/results.page.jsx';
import DetailsPage from './pages/details.page.jsx';
import EmotionsPage from './pages/emotions.page.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/*We use the Route component to define the routes and their corresponding components */}
          <Route path="/" element={<Main />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/emotions" element={<EmotionsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

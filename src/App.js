import './App.css';
import Footer from './features/footer/Footer.jsx';
import Navbar from './features/navbar/Navbar.jsx';
import Banner from './features/banner/Banner.jsx';
import Main from './features/main/Main.jsx';
import ResultsPage from './pages/results.page.jsx';
import DetailsPage from './pages/details.page.jsx';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Main />
      <Footer />

    </div>
  );
}

export default App;

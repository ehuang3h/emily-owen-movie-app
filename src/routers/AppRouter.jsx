// App Router

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

//pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';
import PageDetails from'../pages/PageDetails';

import { appTitle, appAuthor } from '../globals/globalVariables';

// Stylesheets
import '../styles/normalize-fwd.css';
import '../styles/fonts.css';
import '../styles/header.css';
import '../styles/main.css';
import '../styles/about.css';
import '../styles/home.css';
import '../styles/favourites.css'
import '../styles/details.css';

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="wrapper">
        <Header title={appTitle} />
        {/* <Nav /> */}
        <Routes>
          <Route path="/" exact element={<PageHome />} />
          <Route path="/favourites" element={<PageFavs />} />
          <Route path="/details/:movieId" element={<PageDetails />} />
          <Route path="/about" element={<PageAbout />} />
        </Routes>
        
        <Footer author={appAuthor} />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

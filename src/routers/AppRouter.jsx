// App Router

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';

//pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';

import { appTitle, appAuthor } from '../globals/globalVariables';

// Stylesheets
import '../styles/normalize-fwd.css';
import '../styles/fonts.css';
import '../styles/main.css';
import '../styles/header.css';


function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title={appTitle} />
        {/* <Nav /> */}
        <Routes>
          <Route path="/" exact element={<PageHome />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/favourites" element={<PageFavs />} />
         
        </Routes>
        <Footer author={appAuthor} />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

// App Router

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

//pages
import PageHome from '../pages/PageHome';
import PageAbout from '../pages/PageAbout';
import PageFavs from '../pages/PageFavs';
import PageDetails from'../pages/PageDetails';

import { appTitle, appAuthor } from '../globals/globalVariables';

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header title={appTitle} />
        <Nav />
        <Routes>
          <Route path="/" exact element={<PageHome />} />
          <Route path="/about" element={<PageAbout />} />
          <Route path="/favourites" element={<PageFavs />} />
          <Route path="/details/:movieId" element={<PageDetails />} />
        </Routes>
        
        <Footer author={appAuthor} />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;

import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ContentBundle from '../contentBundle/ContentBundle';
import Header from '../Header/Header';
import MenuLeft from '../Menu-left/MenuLeft';
import MenuTop from '../Menu-top/MenuTop';
import Stock from '../stock/Stock';
import Reception from '../Reception/Reception';
import Redirect from '../../Redirect/Redirect';
import Bundling from '../Bundling/Bundling';
import MenuSlideMobile from '../MenuSlideMobile/MenuSlideMobile';
import './app.scss';

const App = () => {
  const location = useLocation();
  const [openSlide, setOpenSlide] = useState(false);

  return (
    <div className="App">
      <MenuSlideMobile setOpenSlide={setOpenSlide} openSlide={openSlide} />
      <Header />
      <MenuLeft location={location.pathname} />
      <MenuTop setOpenSlide={setOpenSlide} location={location.pathname} /> {/*Menu top mobile*/}
      <div className="centre-app">
        {/*Menu top desktop*/}
        <MenuTop setOpenSlide={setOpenSlide} location={location.pathname} />
        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/stock" element={<Stock />} />
          <Route exact path="/stock/:articleName" element={<Stock />} />
          <Route exact path="/fagot-content/:id" element={<ContentBundle />} />
          <Route exact path="/reception" element={<Reception />} />
          <Route exact path="/out-of-stock" element={<Stock />} />
          <Route exact path="/out-of-stock/:articleName" element={<Stock />} />
          <Route exact path="/bundling/:operation/" element={<Bundling />} />
          <Route exact path="/bundling/:operation/:id" element={<Bundling />} />
          <Route exact path="/bundling/:operation/:id/:articleName" element={<Bundling />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

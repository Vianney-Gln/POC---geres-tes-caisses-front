//import react router dom
import { Routes, Route, useLocation } from 'react-router-dom';
import ContentFagot from '../contentFagot/ContentFagot';
// Components imports
import Header from '../Header/Header';
import MenuLeft from '../Menu-left/MenuLeft';
import MenuTop from '../Menu-top/MenuTop';
import Stock from '../stock/Stock';
import Reception from '../Reception/Reception';
import Redirect from '../../Redirect/Redirect';

// style css
import './app.scss';
const App = () => {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <MenuLeft location={location.pathname} />
      <MenuTop location={location.pathname} /> {/*Menu top mobile*/}
      <div className="centre-app">
        {/*Menu top desktop*/}
        <MenuTop location={location.pathname} />
        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/stock" element={<Stock />} />
          <Route exact path="/stock/:articleName" element={<Stock />} />
          <Route exact path="/fagot-content/:id" element={<ContentFagot />} />
          <Route exact path="/reception" element={<Reception />} />
          <Route exact path="/out-of-stock" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

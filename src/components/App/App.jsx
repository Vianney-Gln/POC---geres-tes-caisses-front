//import react router dom
import { Routes, Route } from 'react-router-dom';
import ContentFagot from '../contentFagot/ContentFagot';
// Components imports
import Header from '../Header/Header';
import MenuLeft from '../Menu-left/MenuLeft';
import MenuTop from '../Menu-top/MenuTop';
import Stock from '../stock/Stock';

// style css
import './app.scss';
const App = () => {
  return (
    <div className="App">
      <Header />
      <MenuLeft />
      <MenuTop /> {/*Menu top mobile*/}
      <div className="centre-app">
        {/*Menu top desktop*/}
        <MenuTop />
        <Routes>
          <Route exact path="/" element={<Stock />} />
          <Route exact path="/:articleName" element={<Stock />} />
          <Route exact path="/fagot-content/:id" element={<ContentFagot />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

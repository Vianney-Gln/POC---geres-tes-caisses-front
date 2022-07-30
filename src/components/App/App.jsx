//import react router dom
import { Routes, Route } from 'react-router-dom';
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
      <div className="centre-app">
        <MenuTop />
        <Routes>
          <Route exact path="/" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;

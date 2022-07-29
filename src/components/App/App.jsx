// Components imports
import Header from '../Header/Header';
import MenuLeft from '../Menu-left/MenuLeft';
import MenuTop from '../Menu-top/MenuTop';

// style css
import './app.scss';
const App = () => {
  return (
    <div className="App">
      <Header />
      <MenuLeft />
      <MenuTop />
    </div>
  );
};
export default App;

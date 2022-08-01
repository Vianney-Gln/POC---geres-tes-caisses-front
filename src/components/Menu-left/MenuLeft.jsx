// import react hooks
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import style css
import './menuLeft.scss';
// import components context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const MenuLeft = () => {
  //useNavigate
  const navigate = useNavigate();
  // use context
  const contextArticles = useContext(ContextArticles); // context articles;
  const contextStock = useContext(ContextStock); // context stock
  const { articles, activate } = contextArticles;
  const { typeStock, setTypeStock, numberBoxes } = contextStock;

  /**
   * Function filtering stock by boxes length
   */
  const filter = () => {
    // change this function
    if (activate) console.log('filter');
  };
  return (
    <div className="menu-left">
      <select
        onChange={(e) => {
          setTypeStock(e.target.value);
          navigate('/');
        }}>
        <option value="caisses-vrac">Caisses vracs</option>
        <option value="caisses-total">Caisses total</option>
        <option value="fagots">Fagots</option>
      </select>
      <ul className="list-article">
        {articles.length
          ? articles.map((article) => {
              return (
                <li className={activate ? 'unable' : 'disable'} key={article.id} onClick={filter}>
                  {article.name}
                </li>
              );
            })
          : ''}
      </ul>
      <div className="quantity">
        <p>
          {typeStock === 'caisses-vrac'
            ? 'Nombre caisses vrac:'
            : typeStock === 'caisses-total'
            ? 'Nombre caisses total:'
            : typeStock === 'fagots'
            ? 'Nombre de fagots:'
            : ''}{' '}
          <span>{numberBoxes}</span>
        </p>
      </div>
    </div>
  );
};

export default MenuLeft;

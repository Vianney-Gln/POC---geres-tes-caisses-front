// import react hooks
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import style css
import './menuLeft.scss';
// import components context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';
// import PropTypes
import PropTypes from 'prop-types';

const MenuLeft = ({ location }) => {
  //useNavigate
  const navigate = useNavigate();
  // use context
  const contextArticles = useContext(ContextArticles); // context articles;
  const contextStock = useContext(ContextStock); // context stock
  const { articles, activate, idArticles, setIdArticles } = contextArticles;
  const { typeStock, setTypeStock, numberBoxes, setIdArticleCount } = contextStock;

  //states
  const [resolution, setResolution] = useState('');

  /**
   * Function that generates the first part of the link, depending of location statement
   * @returns {string}
   */
  const generateLink = () => {
    if (location.includes('/out-of-stock')) return '/out-of-stock';
    if (location.includes('/stock')) return '/stock';
  };

  /**
   * Function generating the type of boxes as a string, depending of idArticles statement
   * @returns {string}
   */
  const generateStringCount = () => {
    switch (idArticles) {
      case 1:
        return ' 4m';
      case 2:
        return ' 4m20';
      case 3:
        return ' 4m60';
      default:
        return ' toutes caisses';
    }
  };
  /* --------------------------------------------------- CHECK RESOLUTION TO DISPLAY OR MASQUED THIS COMPONENT -------------------------------*/

  // On component mounting check the resolution small or desktop and store it into a state
  useEffect(() => {
    if (window.matchMedia('(max-width:730px)').matches) {
      setResolution('small');
    } else {
      setResolution('desktop');
    }
  }, []);

  // Function checking what device is (desktop or smartphone) and store thos into a state
  window.onresize = function () {
    if (window.matchMedia('(max-width:730px)').matches) {
      setResolution('small');
    } else {
      setResolution('desktop');
    }
  };

  /* -------------------------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div className={!activate && resolution === 'small' ? 'menu-left-masqued' : 'menu-left'}>
      <select
        disabled={!activate}
        onChange={(e) => {
          setTypeStock(e.target.value);
          navigate(`${generateLink()}`);
        }}>
        <option value="caisses-vrac">Caisses vracs</option>
        <option value="caisses-total">Caisses total</option>
        <option value="fagots">Fagots</option>
      </select>
      <ul className="list-article">
        <li
          onClick={() => {
            if (activate) {
              setIdArticles(null);
              setIdArticleCount(null);
            }
          }}
          className={
            activate && !idArticles
              ? 'unable current'
              : activate && idArticles
              ? 'unable'
              : !activate
              ? 'disable'
              : ''
          }>
          <Link to={`${generateLink()}/toutes caisses`}>Toutes caisses</Link>
        </li>
        {articles.length
          ? articles.map((article) => {
              return (
                <li
                  onClick={() => {
                    if (activate) {
                      setIdArticles(article.id);
                      setIdArticleCount(article.id);
                    }
                  }}
                  className={
                    activate && idArticles === article.id
                      ? 'unable current'
                      : activate && idArticles !== article.id
                      ? 'unable'
                      : !activate
                      ? 'disable'
                      : ''
                  }
                  key={article.id}>
                  <Link to={`${generateLink()}/${article.name}`}>{article.name}</Link>
                </li>
              );
            })
          : ''}
      </ul>
      <div className="quantity">
        <p className={!activate ? 'number-boxes-disable' : 'number-boxes-unable'}>
          {typeStock === 'caisses-vrac'
            ? 'Nombre vrac' + generateStringCount() + ':'
            : typeStock === 'caisses-total'
            ? 'Nombre total' + generateStringCount() + ':'
            : typeStock === 'fagots'
            ? 'Nombre fagots' + generateStringCount() + ':'
            : ''}{' '}
        </p>
        {activate ? <span>{numberBoxes}</span> : ''}
      </div>
    </div>
  );
};

MenuLeft.propTypes = {
  location: PropTypes.string
};

export default MenuLeft;

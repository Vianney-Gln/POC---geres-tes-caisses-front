import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './menuLeft.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';
import ContextBundles from '../../context/ContextBundles';
import PropTypes from 'prop-types';

const MenuLeft = ({ location }) => {
  const navigate = useNavigate();

  const contextArticles = useContext(ContextArticles);
  const contextStock = useContext(ContextStock);
  const contextBundles = useContext(ContextBundles);
  const { articles, areActivateFilters, idArticles, setIdArticles } = contextArticles;
  const { typeStock, setTypeStock, numberBoxes, setIdArticleCountForCountFunctions } = contextStock;
  const { currentIdBundle } = contextBundles;

  const [deviceResolution, setDeviceResolution] = useState('');

  /**
   * Function that generates the first part of the link, depending of location statement
   * @returns {string}
   */
  const generateUrl = () => {
    if (location.includes('/out-of-stock')) return '/out-of-stock';
    if (location.includes('/stock')) return '/stock';
    if (location.includes('/bundling/bundle') && currentIdBundle) {
      return `/bundling/bundle/${currentIdBundle}`;
    }
  };

  /**
   * Function generating the type of boxes as a string, depending of idArticles statement
   * @returns {string}
   */
  const generateNameSizeBoxes = () => {
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
      setDeviceResolution('small');
    } else {
      setDeviceResolution('desktop');
    }
  }, []);

  // Function checking what device is (desktop or smartphone) and store thos into a state
  window.onresize = function () {
    if (window.matchMedia('(max-width:730px)').matches) {
      setDeviceResolution('small');
    } else {
      setDeviceResolution('desktop');
    }
  };

  /* -------------------------------------------------------------------------------------------------------------------------------------------*/

  return (
    <div
      className={
        !areActivateFilters && deviceResolution === 'small' ? 'menu-left-masqued' : 'menu-left'
      }>
      <select
        disabled={
          location.includes('/bundling/bundle') && currentIdBundle
            ? true
            : areActivateFilters
            ? false
            : true
        }
        value={typeStock}
        onChange={(e) => {
          setTypeStock(e.target.value);
          setIdArticles(null);
          navigate(`${generateUrl()}`);
        }}>
        <option value="caisses-vrac">Caisses vracs</option>
        <option value="caisses-total">Caisses total</option>
        <option disabled={location.includes('/out-of-stock') ? true : false} value="fagots">
          Fagots
        </option>
      </select>
      <ul className="list-article">
        <li
          onClick={() => {
            if (areActivateFilters) {
              setIdArticles(null);
              setIdArticleCountForCountFunctions(null);
            }
          }}
          className={
            areActivateFilters && !idArticles
              ? 'unable current'
              : areActivateFilters && idArticles
              ? 'unable'
              : !areActivateFilters
              ? 'disable'
              : ''
          }>
          {!idArticles && (
            <i className="icon">
              <FontAwesomeIcon icon={faCaretRight} />
            </i>
          )}
          <Link to={`${generateUrl()}/toutes caisses`}>Toutes caisses</Link>
        </li>
        {articles.length
          ? articles.map((article) => {
              return (
                <li
                  onClick={() => {
                    if (areActivateFilters) {
                      setIdArticles(article.id);
                      setIdArticleCountForCountFunctions(article.id);
                    }
                  }}
                  className={
                    areActivateFilters && idArticles === article.id
                      ? 'unable current'
                      : areActivateFilters && idArticles !== article.id
                      ? 'unable'
                      : !areActivateFilters
                      ? 'disable'
                      : ''
                  }
                  key={article.id}>
                  {idArticles === article.id && (
                    <i className="icon">
                      <FontAwesomeIcon icon={faCaretRight} />
                    </i>
                  )}

                  <Link to={`${generateUrl()}/${article.name}`}>{article.name}</Link>
                </li>
              );
            })
          : ''}
      </ul>
      <div className="quantity">
        <p className={!areActivateFilters ? 'number-boxes-disable' : 'number-boxes-unable'}>
          {typeStock === 'caisses-vrac'
            ? 'Nombre vrac' + generateNameSizeBoxes() + ':'
            : typeStock === 'caisses-total'
            ? 'Nombre total' + generateNameSizeBoxes() + ':'
            : typeStock === 'fagots'
            ? 'Nombre fagots' + generateNameSizeBoxes() + ':'
            : ''}{' '}
        </p>
        {areActivateFilters ? <span>{numberBoxes}</span> : ''}
      </div>
    </div>
  );
};

MenuLeft.propTypes = {
  location: PropTypes.string
};

export default MenuLeft;

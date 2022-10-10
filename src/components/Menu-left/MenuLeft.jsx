import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './menuLeft.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';
import ContextBundles from '../../context/ContextBundles';
import PropTypes from 'prop-types';
import generateUrl, { generateNameSizeBoxes } from './util';

const MenuLeft = ({ location }) => {
  const navigate = useNavigate();

  const contextArticles = useContext(ContextArticles);
  const contextStock = useContext(ContextStock);
  const contextBundles = useContext(ContextBundles);
  const { articles, areActivateFilters, idArticles, setIdArticles } = contextArticles;
  const { typeStock, setTypeStock, numberBoxes, setIdArticleCountForCountFunctions } = contextStock;
  const { currentIdBundle } = contextBundles;

  const [deviceResolution, setDeviceResolution] = useState('');

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
          navigate(`${generateUrl(location, currentIdBundle)}`);
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
          <Link to={`${generateUrl(location, currentIdBundle)}/toutes caisses`}>
            Toutes caisses
          </Link>
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

                  <Link to={`${generateUrl(location, currentIdBundle)}/${article.name}`}>
                    {article.name}
                  </Link>
                </li>
              );
            })
          : ''}
      </ul>
      <div className="quantity">
        <p className={!areActivateFilters ? 'number-boxes-disable' : 'number-boxes-unable'}>
          {typeStock === 'caisses-vrac'
            ? 'Nombre vrac' + generateNameSizeBoxes(idArticles) + ':'
            : typeStock === 'caisses-total'
            ? 'Nombre total' + generateNameSizeBoxes(idArticles) + ':'
            : typeStock === 'fagots'
            ? 'Nombre fagots' + generateNameSizeBoxes(idArticles) + ':'
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

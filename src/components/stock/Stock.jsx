import React, { useState, useEffect, useContext } from 'react';
import './stock.scss';
import { useParams, useNavigate } from 'react-router-dom';
import getStockVrac, { getStockTotal, getBundles } from '../../services/stock';
import ContextStock from '../../context/ContextStock';
import ContextArticles from '../../context/ContextArticles';
import ContextBundles from '../../context/ContextBundles';
import TableStock from '../tableStock/TableStock';
import CardsStockBundle from '../cardsStockBundles/CardsStockBundle';

const Stock = () => {
  document.title = 'Gestion des caisses - stock';

  const navigate = useNavigate();

  const [stock, setStock] = useState([]); // state getting stock
  const [fagots, setFagots] = useState([]); // state getting fagot contents

  const param = useParams();

  // On Mounting component, if the user reload this page, remove the url parameter and redirect to stock page
  useEffect(() => {
    if (param.articleName) navigate('/');
  }, []);

  const contextStock = useContext(ContextStock);
  const { setTypeStock, typeStock } = contextStock;
  const contextArticle = useContext(ContextArticles);
  const { setAreActivateFilters, idArticles } = contextArticle;
  const contextBundles = useContext(ContextBundles);
  const { restartEffect } = contextBundles;

  // On component mounting, call api and get stock, depending of typeStock and idArticles filters
  useEffect(() => {
    if (location.pathname.includes('bundling/bundle')) {
      setTypeStock('caisses-vrac');
    }
    if (typeStock === 'caisses-vrac') {
      setAreActivateFilters(true);
      getStockVrac(idArticles)
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => console.log(err));
    } else if (typeStock === 'caisses-total') {
      setAreActivateFilters(true);
      getStockTotal(idArticles)
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typeStock === 'fagots') {
      setAreActivateFilters(true);
      getBundles(idArticles)
        .then((result) => {
          setFagots(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setStock([]);
    }
  }, [typeStock, param.articleName, restartEffect]);
  return (
    <div className="container-stock">
      {typeStock === 'caisses-vrac' || typeStock === 'caisses-total' ? (
        <TableStock captionName={param.articleName} stock={stock} typeStock={typeStock} />
      ) : typeStock === 'fagots' ? (
        <>
          <ul className="list-cards">
            <h2>{`Fagots ${param.articleName ? param.articleName : 'toutes caisses'}`}</h2>
            {fagots.length ? (
              fagots.map((elt, index) => (
                <CardsStockBundle key={index} stock={elt} fagotId={elt.fagotId} />
              ))
            ) : (
              <p className="no-fagot-found">Aucun fagot trouvé</p>
            )}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default Stock;

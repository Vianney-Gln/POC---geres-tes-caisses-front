// import react hook;
import React, { useState, useEffect, useContext } from 'react';
// import style css;
import './stock.scss';
// import useParams
import { useParams } from 'react-router-dom';
// service
import getStockVrac, { getStockTotal, getFagots } from '../../services/stock';
// import components context
import ContextStock from '../../context/ContextStock';
import ContextArticles from '../../context/ContextArticles';
// import components
import TableStock from '../tableStock/TableStock';
import CardsStockFagot from '../cardsStockFagots/CardsStockFagot';

const Stock = () => {
  // docTitle
  document.title = 'Gestion des caisses - stock';
  // States
  const [stock, setStock] = useState([]); // state getting stock
  const [fagots, setFagots] = useState([]); // state getting fagot contents

  //useParams
  const param = useParams();

  // get Context
  const contextStock = useContext(ContextStock);
  const { setTypeStock, typeStock } = contextStock;
  const contextArticle = useContext(ContextArticles);
  const { setActivate, setArticleName, idArticles } = contextArticle;

  // function getting stock calling api

  useEffect(() => {
    setArticleName(param.articleName);

    if (location.pathname.includes('bundling/bundle')) {
      setTypeStock('caisses-vrac');
    }
    if (typeStock === 'caisses-vrac') {
      setActivate(true);
      getStockVrac(idArticles)
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => console.log(err));
    } else if (typeStock === 'caisses-total') {
      setActivate(true);
      getStockTotal(idArticles)
        .then((result) => {
          setStock(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typeStock === 'fagots') {
      setActivate(true);
      getFagots(idArticles)
        .then((result) => {
          setFagots(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setStock([]);
    }
  }, [typeStock, param.articleName]);
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
                <CardsStockFagot key={index} stock={elt} fagotId={elt.fagotId} />
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

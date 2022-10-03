import React, { useEffect, useState, useContext } from 'react';
// Import style css
import './manageBundle.scss';
// Import services
import { getBundles } from '../../../services/stock';
// Import components
import CardsStockFagot from '../../cardsStockFagots/CardsStockFagot';
// Import component context
import ContextArticles from '../../../context/ContextArticles';
const ManageBundle = () => {
  // States
  const [fagots, setFagots] = useState([]);
  const [reloadEffect, setReloadeffect] = useState(false);

  // Context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // Function calling service to get fagots on component mount
  useEffect(() => {
    getBundles().then((result) => setFagots(result.data));
  }, [reloadEffect]);

  // Function settting activate context statement to false to disable the MenuLeft component on component mount
  useEffect(() => {
    setActivate(false);
  }, []);

  // Function reloading the useEffect by update the reloadEffect state for each request in CardStockComponent > ModalComponent
  const handleEffect = () => {
    setReloadeffect(!reloadEffect);
  };

  return (
    <div className="container-manageBundle">
      <h2>Gestion des fagots</h2>
      <ul className="list-cards">
        {fagots.length ? (
          fagots.map((elt, index) => (
            <CardsStockFagot
              key={index}
              handleEffect={handleEffect}
              stock={elt}
              fagotId={elt.fagotId}
            />
          ))
        ) : (
          <p className="no-fagot-found">Aucun fagot trouvé</p>
        )}
      </ul>
    </div>
  );
};

export default ManageBundle;

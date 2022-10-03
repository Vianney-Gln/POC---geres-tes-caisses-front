import React, { useEffect, useState, useContext } from 'react';
import './manageBundle.scss';
import { getBundles } from '../../../services/stock';
import CardsStockBundle from '../../cardsStockBundles/CardsStockBundle';
import ContextArticles from '../../../context/ContextArticles';
const ManageBundle = () => {
  const [fagots, setFagots] = useState([]);
  const [reloadEffect, setReloadeffect] = useState(false);

  const contextArticles = useContext(ContextArticles);
  const { setAreActivateFilters } = contextArticles;

  // Function calling service to get fagots on component mount
  useEffect(() => {
    getBundles().then((result) => setFagots(result.data));
  }, [reloadEffect]);

  // Function settting activate context statement to false to disable the MenuLeft component on component mount
  useEffect(() => {
    setAreActivateFilters(false);
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
            <CardsStockBundle
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

import React, { useEffect, useState } from 'react';
// Import style css
import './manageBundle.scss';
// Import services
import { getFagots } from '../../../services/stock';
// Import components
import CardsStockFagot from '../../cardsStockFagots/CardsStockFagot';
const ManageBundle = () => {
  // States
  const [fagots, setFagots] = useState([]);
  const [reloadEffect, setReloadeffect] = useState(false);
  useEffect(() => {
    getFagots().then((result) => setFagots(result.data));
  }, [reloadEffect]);

  // Function reloading the useEffect by update the reloadEffect state for each request in CardStockComponent > ModalComponent
  const handleEffect = () => {
    setReloadeffect(!reloadEffect);
  };

  return (
    <div className="container-manageBundle">
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

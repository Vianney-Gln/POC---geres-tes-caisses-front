// import react hooks
import React, { useEffect, useState, useContext } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// import Components context
import ContextArticles from '../../context/ContextArticles';
import ContextFagots from '../../context/ContextFagots';
// import style css
import './contentFagot.scss';
// import service
import { getBoxeByFagot } from '../../services/stock';
import { getInfoFagotById } from '../../services/fagot';
// import PropTypes
import PropTypes from 'prop-types';

const ContentFagot = ({ operation }) => {
  // context
  const contextArticles = useContext(ContextArticles);
  const contextFagots = useContext(ContextFagots);
  const { setActivate } = contextArticles; // able - disable filters
  const { boxesToAdd, setBoxesToAdd, fagotBoxes, setFagotBoxes } = contextFagots;

  // States
  const [currFagot, setCurrFagot] = useState({}); // state current fagot

  // params
  const param = useParams();

  // Function setting the boxes statement and disable filters
  useEffect(() => {
    if (location.pathname.includes('/bundling/bundle')) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [boxesToAdd]);

  // Function removing all selected boxes if this componant unmount
  useEffect(() => {
    return () => setBoxesToAdd([]);
  }, []);

  // Function getting boxes from one fagot
  useEffect(() => {
    getBoxeByFagot(param.id)
      .then((result) => {
        setFagotBoxes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * Function generating empty rows
   * @returns
   */
  const generateEmptyRows = () => {
    const maxRows = 10;
    const sum = fagotBoxes.length + boxesToAdd.length;
    const diff = maxRows - sum;
    if (diff > 0) {
      const tempArray = new Array(diff).fill(undefined);
      return tempArray.map((_, index) => {
        return (
          <tr key={index}>
            <td align="center">----</td>
            <td align="center">----</td>
            <td align="center">----</td>
            {operation === 'bundle' && <td align="center">----</td>}
          </tr>
        );
      });
    }
  };

  // On component mounting get the uuid of the current fagot (displayed in the caption)
  useEffect(() => {
    getInfoFagotById(param.id)
      .then((result) => {
        setCurrFagot(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * Function removing a boxe from one bundle during update
   * @param {object} element
   */
  const removeToBundle = (element) => {
    let copy = [...boxesToAdd];
    if (copy.find((el) => el.id === element.id)) {
      copy = copy.filter((el) => el.id !== element.id);
    }
    setBoxesToAdd(copy);
  };

  return (
    <div className="container-contentFagot">
      <table className="table-boxes-fagots">
        <caption className="caption">
          {operation === 'bundle' ? 'Mise à jour' : 'Constitution'} du{' '}
          {currFagot.uuid ? currFagot.uuid : 'fagot'}
          <br></br>
          <span className="info-fagot">{currFagot.name}</span>
          <span className="info-fagot"> {fagotBoxes.length + boxesToAdd.length} /10</span>
          {operation === 'bundle' && <button type="button">Mise à jour</button>}
        </caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
            <th>numéro fagot</th>
            {operation === 'bundle' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {fagotBoxes &&
            fagotBoxes.map((element, index) => {
              return (
                <tr key={index}>
                  <td align="center">{element.idCaisse}</td>
                  <td align="center">{element.name}</td>
                  <td align="center">{element.idFagot}</td>
                  {operation === 'bundle' && <td align="center">-----</td>}
                </tr>
              );
            })}
          {operation === 'bundle' && boxesToAdd.length
            ? boxesToAdd.map((elt, index) => {
                return (
                  <tr className="justAdded" key={index}>
                    <td align="center">{elt.uuid}</td>
                    <td align="center">{elt.name}</td>
                    <td align="center">{currFagot.uuid}</td>
                    <td className="delete" onClick={() => removeToBundle(elt)} align="center">
                      Annuler
                    </td>
                  </tr>
                );
              })
            : ''}
          {generateEmptyRows()}
        </tbody>
      </table>
    </div>
  );
};

ContentFagot.propTypes = {
  operation: PropTypes.string
};

export default ContentFagot;

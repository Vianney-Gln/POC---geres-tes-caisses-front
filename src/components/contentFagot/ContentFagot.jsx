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
  const { boxesToAdd, setBoxesToAdd } = contextFagots;
  const [currId, setCurrId] = useState(null); // state current uuid fagot
  // params
  const param = useParams();
  // Sates
  const [fagotBoxes, setFagotBoxes] = useState([]); // state getting boxes from one fagot

  // Function getting boxes from one fagot, setting the boxes statement and disable filters
  useEffect(() => {
    if (location.pathname.includes('/bundling/bundle')) {
      setActivate(true);
    } else {
      setActivate(false);
    }
    getBoxeByFagot(param.id)
      .then((result) => {
        setFagotBoxes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boxesToAdd]);

  // On component mounting get the uuid of the current fagot (displayed in the caption)
  useEffect(() => {
    getInfoFagotById(param.id)
      .then((result) => {
        setCurrId(result.data.uuid);
        console.log(result);
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
        <caption className="caption">Constitution du {currId ? currId : 'fagot'}</caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
            <th>numéro fagot</th>
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
                </tr>
              );
            })}
          {operation === 'bundle' && boxesToAdd.length
            ? boxesToAdd.map((elt, index) => {
                return (
                  <tr onClick={() => removeToBundle(elt)} key={index}>
                    <td align="center">{elt.uuid}</td>
                    <td align="center">{elt.name}</td>
                    <td align="center">{fagotBoxes[0].idFagot}</td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </table>
    </div>
  );
};

ContentFagot.propTypes = {
  operation: PropTypes.string
};

export default ContentFagot;

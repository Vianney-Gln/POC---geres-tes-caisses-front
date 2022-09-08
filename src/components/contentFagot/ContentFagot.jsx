// import react hooks
import React, { useEffect, useState, useContext } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// import Components
import ContextArticles from '../../context/ContextArticles';
// import style css
import './contentFagot.scss';
// import service
import { getBoxeByFagot } from '../../services/stock';
// import PropTypes
import PropTypes from 'prop-types';

const ContentFagot = ({ operation }) => {
  // context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles; // able - disable filters
  // params
  const param = useParams();
  // Sates
  const [fagotBoxes, setFagotBoxes] = useState([]); // state getting boxes from one fagot
  const [numberLines, setNumberLines] = useState([]); // max lines table

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
        const diff = 10 - result.data.length;
        const lines = new Array(diff).fill('undefined');
        setNumberLines(lines);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-contentFagot">
      <table className="table-boxes-fagots">
        <caption>Constitution du fagot</caption>
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
          {operation === 'bundle' &&
            numberLines.length &&
            numberLines.map((_, index) => {
              return (
                <tr key={index}>
                  <td align="center">Néant</td>
                  <td align="center">-----</td>
                  <td align="center">-----</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

ContentFagot.propTypes = {
  operation: PropTypes.string
};

export default ContentFagot;

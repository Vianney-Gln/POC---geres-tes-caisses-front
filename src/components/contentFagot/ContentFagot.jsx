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

const ContentFagot = () => {
  // context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles; // able - disable filters
  // params
  const param = useParams();
  // Sates
  const [fagotBoxes, setFagotBoxes] = useState([]); // state getting boxes from one fagot
  // Function getting boxes from one fagot, setting the boxes statement and disable filters
  useEffect(() => {
    setActivate(false);
    getBoxeByFagot(param.id)
      .then((result) => {
        setFagotBoxes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container-contentFagot">
      <table className="table-boxes-fagots">
        <caption>{`Constitution du fagot fag-${param.id}`}</caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
            <th>numéro fagot</th>
          </tr>
        </thead>
        <tbody>
          {fagotBoxes.length < 1 && (
            <tr align="center">
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
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
        </tbody>
      </table>
    </div>
  );
};

export default ContentFagot;

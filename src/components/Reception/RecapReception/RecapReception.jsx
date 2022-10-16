import React from 'react';
import './recapReception.scss';

const RecapReception = () => {
  return (
    <div className="container-recap-reception">
      <table className="table-reception">
        <caption>Réception du .../.../... à telle heure</caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1 - id</td>
            <td>Item 1 - designation</td>
          </tr>
          <tr>
            <td>Item 2 - id</td>
            <td>Item 2 - designation</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecapReception;

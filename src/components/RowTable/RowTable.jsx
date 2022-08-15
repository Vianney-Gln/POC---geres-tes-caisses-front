import React, { useState } from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import style css
import './rowTable.scss';

const RowTable = ({ element, typeStock }) => {
  // States
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!selected);
  };
  return (
    <tr
      onClick={handleSelect}
      className={
        location.pathname.includes('/out-of-stock') && selected
          ? 'to-select selected'
          : location.pathname.includes('/out-of-stock')
          ? 'to-select'
          : ''
      }>
      <td align="center">{element.uuid}</td>
      <td align="center">{element.name}</td>
      {typeStock === 'caisses-total' ? (
        <td align="center">{element.idFagot ? 'fag-' + element.idFagot : 'non fagotée'}</td>
      ) : (
        ''
      )}
    </tr>
  );
};

RowTable.propTypes = {
  typeStock: PropTypes.string,
  element: PropTypes.object
};

export default RowTable;

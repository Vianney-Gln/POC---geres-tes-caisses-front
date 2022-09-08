import React from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import style css
import './rowTable.scss';

const RowTable = ({ element, typeStock, setSelected, selected }) => {
  /**
   * Function getting or deleting data to the cliqued row --- out-of-stock use only
   */
  const handleSelect = () => {
    let copy = [...selected];
    if (copy.find((el) => el.id === element.id)) {
      copy = copy.filter((el) => el.id !== element.id);
    } else {
      copy.push(element);
    }
    setSelected(copy);
  };

  const addToBundle = () => {
    console.log('coucou');
  };

  return (
    <tr
      onClick={() => {
        location.pathname.includes('/out-of-stock')
          ? handleSelect()
          : location.pathname.includes('/bundling/bundle')
          ? addToBundle()
          : '';
      }}
      className={
        location.pathname.includes('/out-of-stock') && selected.find((el) => el.id === element.id)
          ? 'to-select selected'
          : location.pathname.includes('/out-of-stock')
          ? 'to-select'
          : location.pathname.includes('/bundling/bundle')
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
  element: PropTypes.object,
  setSelected: PropTypes.func,
  selected: PropTypes.array
};

export default RowTable;

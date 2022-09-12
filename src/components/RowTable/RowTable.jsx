import React, { useContext, useState, useEffect } from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import style css
import './rowTable.scss';
// Import component context
import ContextFagots from '../../context/ContextFagots';

const RowTable = ({ element, typeStock, setSelected, selected, operation }) => {
  // Context
  const contextFagots = useContext(ContextFagots);
  const { boxesToAdd, setBoxesToAdd, fagotBoxes, currFagot } = contextFagots;

  // States
  const [added, setAdded] = useState(false);

  // On component mounting compare the current element with array boxesToAdd, if not match, this element 's classname "added" is removed
  useEffect(() => {
    if (!boxesToAdd.find((elt) => elt.uuid === element.uuid)) {
      setAdded(false);
    }
  }, [boxesToAdd]);

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

  /**
   * Function getting or deleting data to the cliqued row --- bundling/bundle use only
   */
  const addToBundle = () => {
    let copy = [...boxesToAdd];
    const sum = fagotBoxes.length + copy.length;

    if (!copy.find((elt) => elt.id === element.id) && sum < 10 && element.name === currFagot.name) {
      copy.push(element);
      setBoxesToAdd(copy);
      setAdded(true);
    }
    if (element.name !== currFagot.name)
      alert('Attention la taille de la caisse ne correspond pas à la taille du fagot');
  };

  return (
    <tr
      onClick={() => {
        location.pathname.includes('/out-of-stock') ? handleSelect() : '';
      }}
      className={
        location.pathname.includes('/out-of-stock') && selected.find((el) => el.id === element.id)
          ? 'to-select selected'
          : location.pathname.includes('/out-of-stock')
          ? 'to-select'
          : location.pathname.includes('/bundling/bundle') && added
          ? 'to-select added'
          : 'to-select'
      }>
      <td align="center">{element.uuid}</td>
      <td align="center">{element.name}</td>
      {operation === 'bundle' && (
        <td
          onClick={() => {
            addToBundle();
          }}
          className="bundle"
          align="center">
          Fagoter
        </td>
      )}
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
  selected: PropTypes.array,
  operation: PropTypes.string
};

export default RowTable;

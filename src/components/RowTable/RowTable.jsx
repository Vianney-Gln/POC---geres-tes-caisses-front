import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './rowTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import ContextBundles from '../../context/ContextBundles';
import handleSelect, { addToBundle } from './util';

const RowTable = ({ element, typeStock, setSelected, selected, operation }) => {
  const contextBundles = useContext(ContextBundles);
  const { boxesToAdd, setBoxesToAdd, getBundleBoxes, currBundle } = contextBundles;

  return (
    <tr
      onClick={() => {
        location.pathname.includes('/out-of-stock')
          ? handleSelect(selected, element, setSelected)
          : '';
      }}
      className={
        location.pathname.includes('/out-of-stock') && selected.find((el) => el.id === element.id)
          ? 'to-select selected'
          : location.pathname.includes('/out-of-stock')
          ? 'to-select'
          : location.pathname.includes('/bundling/bundle') &&
            boxesToAdd.find((el) => el.id === element.id)
          ? 'to-select added'
          : 'to-select'
      }>
      <td align="center">{element.uuid}</td>
      <td align="center">{element.name}</td>
      {operation === 'bundle' && (
        <td
          onClick={() => {
            addToBundle(boxesToAdd, getBundleBoxes, element, setBoxesToAdd, currBundle);
          }}
          className="bundle icon"
          align="center"
          title="fagoter">
          <FontAwesomeIcon icon={faBoxesStacked} />
        </td>
      )}
      {typeStock === 'caisses-total' ? (
        <td align="center">{element.nameFagot ? element.nameFagot : 'non fagotée'}</td>
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

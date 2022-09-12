// imports hooks
import React, { createContext, useState } from 'react';
// create context
const ContextFagots = createContext(null);
// import proptypes
import PropTypes from 'prop-types';

export const ContextFagotsProvider = ({ children }) => {
  // States
  const [currentIdBundle, setCurrentIdBundle] = useState(null);
  const [boxesToAdd, setBoxesToAdd] = useState([]); // state boxes to send into api for update
  const [fagotBoxes, setFagotBoxes] = useState([]); // state getting boxes from one fagot http request
  const [currFagot, setCurrFagot] = useState({}); // state current fagot

  return (
    <ContextFagots.Provider
      value={{
        currentIdBundle,
        setCurrentIdBundle,
        boxesToAdd,
        setBoxesToAdd,
        fagotBoxes,
        setFagotBoxes,
        currFagot,
        setCurrFagot
      }}>
      {children}
    </ContextFagots.Provider>
  );
};

ContextFagotsProvider.propTypes = {
  children: PropTypes.node
};

export default ContextFagots;

// imports hooks
import React, { createContext, useState } from 'react';
// create context
const ContextFagots = createContext(null);
// import proptypes
import PropTypes from 'prop-types';

export const ContextFagotsProvider = ({ children }) => {
  // States
  const [currentIdBundle, setCurrentIdBundle] = useState(null);
  const [boxesToAdd, setBoxesToAdd] = useState([]);

  return (
    <ContextFagots.Provider
      value={{ currentIdBundle, setCurrentIdBundle, boxesToAdd, setBoxesToAdd }}>
      {children}
    </ContextFagots.Provider>
  );
};

ContextFagotsProvider.propTypes = {
  children: PropTypes.node
};

export default ContextFagots;

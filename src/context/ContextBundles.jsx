// imports hooks
import React, { createContext, useState } from 'react';
// create context
const ContextBundles = createContext(null);
// import proptypes
import PropTypes from 'prop-types';

export const ContextBundleProvider = ({ children }) => {
  // States
  const [currentIdBundle, setCurrentIdBundle] = useState(null);
  const [boxesToAdd, setBoxesToAdd] = useState([]); // state boxes to send into api for update
  const [fagotBoxes, setFagotBoxes] = useState([]); // state getting boxes from one fagot http request
  const [currBundle, setCurrBundle] = useState({}); // state current fagot
  const [restartEffect, setRestartEffect] = useState(false); // state used to restart the useEffect in Stock component

  // Function restarting the useEffect in Stock component
  const handleRestartEffect = () => {
    setRestartEffect(!restartEffect);
  };

  return (
    <ContextBundles.Provider
      value={{
        currentIdBundle,
        setCurrentIdBundle,
        boxesToAdd,
        setBoxesToAdd,
        fagotBoxes,
        setFagotBoxes,
        currBundle,
        setCurrBundle,
        handleRestartEffect,
        restartEffect
      }}>
      {children}
    </ContextBundles.Provider>
  );
};

ContextBundleProvider.propTypes = {
  children: PropTypes.node
};

export default ContextBundles;

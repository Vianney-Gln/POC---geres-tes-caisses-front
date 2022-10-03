import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ContextBundles = createContext(null);

export const ContextBundleProvider = ({ children }) => {
  const [currentIdBundle, setCurrentIdBundle] = useState(null);
  const [boxesToAdd, setBoxesToAdd] = useState([]);
  const [getBundleBoxes, setGetBundleBoxes] = useState([]);
  const [currBundle, setCurrBundle] = useState({});
  const [restartEffect, setRestartEffect] = useState(false);

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
        getBundleBoxes,
        setGetBundleBoxes,
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

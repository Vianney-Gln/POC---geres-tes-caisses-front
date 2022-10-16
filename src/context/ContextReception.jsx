import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ContextReception = createContext(null);

export const ContextReceptionProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [messageServer, setMessageServer] = useState('');
  const [dataInputs, setDataInputs] = useState([{ uuid: '', id_article: '' }]);
  return (
    <ContextReception.Provider
      value={{
        error,
        setError,
        dataInputs,
        setMessageServer,
        messageServer,
        setDataInputs
      }}>
      {children}
    </ContextReception.Provider>
  );
};

ContextReceptionProvider.propTypes = {
  children: PropTypes.node
};

export default ContextReception;

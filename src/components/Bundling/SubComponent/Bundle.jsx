import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// Import style css
import './bundle.scss';
// Import components
import ContentBundle from '../../contentBundle/ContentBundle';
import Stock from '../../stock/Stock';
// import PropTypes
import PropTypes from 'prop-types';
// Import component context
import ContextBundles from '../../../context/ContextBundles';

const Bundle = ({ operation }) => {
  // Context
  const contextBundles = useContext(ContextBundles);

  // Params
  const param = useParams();

  useEffect(() => {
    contextBundles.setCurrentIdBundle(param.id);
  }, []);

  return (
    <div className="container-bundle">
      <div className="table-this-bundle">
        <ContentBundle operation={operation} />
      </div>
      <div className="arrows">
        <FontAwesomeIcon icon={faArrowLeft} />
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <div className="table-stock">
        <Stock />
      </div>
    </div>
  );
};

Bundle.propTypes = {
  operation: PropTypes.string
};

export default Bundle;

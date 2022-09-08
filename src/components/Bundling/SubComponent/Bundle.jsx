import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import style css
import './bundle.scss';
// Import components
import ContentFagot from '../../contentFagot/ContentFagot';
import Stock from '../../stock/Stock';
// import PropTypes
import PropTypes from 'prop-types';
// Import component context
import ContextFagots from '../../../context/ContextFagots';

const Bundle = ({ operation }) => {
  // Context
  const contextFagot = useContext(ContextFagots);

  // Params
  const param = useParams();

  useEffect(() => {
    contextFagot.setCurrentIdBundle(param.id);
  }, []);

  return (
    <div className="container-bundle">
      <div className="table-this-bundle">
        <ContentFagot operation={operation} />
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

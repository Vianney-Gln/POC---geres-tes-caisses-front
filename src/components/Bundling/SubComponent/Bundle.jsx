import React from 'react';
// Import style css
import './bundle.scss';
// Import components
import ContentFagot from '../../contentFagot/ContentFagot';
// import PropTypes
import PropTypes from 'prop-types';

const Bundle = ({ operation }) => {
  return (
    <div className="container-bundle">
      <div className="table-this-bundle">
        <ContentFagot operation={operation} />
      </div>
      <div className="table-stock"></div>
    </div>
  );
};

Bundle.propTypes = {
  operation: PropTypes.string
};

export default Bundle;

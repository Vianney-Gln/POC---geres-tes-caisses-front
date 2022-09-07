import React from 'react';
// Import style css
import './bundle.scss';
// Import components
import ContentFagot from '../../contentFagot/ContentFagot';

const Bundle = () => {
  return (
    <div className="container-bundle">
      <div className="table-this-bundle">
        <ContentFagot />
      </div>
      <div className="table-stock"></div>
    </div>
  );
};

export default Bundle;

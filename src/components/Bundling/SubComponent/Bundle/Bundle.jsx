import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './bundle.scss';
import ContentBundle from '../../../contentBundle/ContentBundle';
import Stock from '../../../stock/Stock';
import PropTypes from 'prop-types';
import ContextBundles from '../../../../context/ContextBundles';

const Bundle = ({ operation }) => {
  const contextBundles = useContext(ContextBundles);

  const param = useParams();

  // On component mounting set the current id bundle equal to the param id
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

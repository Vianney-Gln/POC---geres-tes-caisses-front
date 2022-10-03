import React from 'react';
import { useParams } from 'react-router-dom';
import './bundling.scss';
import CreateBundle from './SubComponent/CreateBundle';
import ManageBundle from '../Bundling/SubComponent/ManageBundle';
import Bundle from './SubComponent/Bundle';
const Bundling = () => {
  const param = useParams();
  const { operation } = param;

  return (
    <div className="container-bundling">
      {operation === 'create-bundle' ? <CreateBundle /> : ''}
      {operation === 'manage-bundle' ? <ManageBundle /> : ''}
      {operation === 'bundle' ? <Bundle operation={operation} /> : ''}
    </div>
  );
};

export default Bundling;

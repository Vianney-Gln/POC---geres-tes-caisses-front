import React, { useContext, useEffect } from 'react';
// import reac-router-dom
import { useParams } from 'react-router-dom';
// import style css
import './bundling.scss';
// import Context
import ContextArticles from '../../context/ContextArticles';
// import Components
import CreateBundle from './SubComponent/CreateBundle';
import ManageBundle from '../Bundling/SubComponent/ManageBundle';
const Bundling = () => {
  // Context
  const contextArticle = useContext(ContextArticles);
  const { setActivate } = contextArticle;

  // useParams
  const param = useParams();
  const { operation } = param;

  // Function disabling the MenuLeft
  useEffect(() => {
    setActivate(false);
  }, []);

  return (
    <div className="container-bundling">
      {operation === 'create-bundle' ? <CreateBundle /> : ''}
      {operation === 'manage-bundle' ? <ManageBundle /> : ''}
    </div>
  );
};

export default Bundling;

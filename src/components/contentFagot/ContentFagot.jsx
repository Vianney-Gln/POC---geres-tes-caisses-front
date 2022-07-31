// import react hooks
import React from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// import style css
import './contentFagot.scss';

const ContentFagot = () => {
  const param = useParams();
  console.log(param.id);
  return <div>ContentFagot</div>;
};

export default ContentFagot;

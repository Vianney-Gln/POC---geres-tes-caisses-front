import React, { useEffect } from 'react';
// useNavigate
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/stock');
  }, []);
  return <div>Redirect</div>;
};

export default Redirect;

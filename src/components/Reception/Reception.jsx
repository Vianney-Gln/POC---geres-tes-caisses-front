import React, { useContext, useEffect, useState } from 'react';
// import context
import ContextArticles from '../../context/ContextArticles';
// import style css
import './reception.scss';
// import Components
import NewLineForm from '../NewLineForm/NewLineForm';

const Reception = () => {
  // Context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  const [dataInputs, setDataInputs] = useState([]);

  const addNewLine = () => {
    const newDataInputs = [...dataInputs];
    newDataInputs.push({});
    setDataInputs(newDataInputs);
    console.log(newDataInputs);
  };

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);
  return (
    <div className="container-reception">
      <h2>Reception</h2>
      <form className="form-reception">
        <div className="container-form">
          <NewLineForm addNewLine={addNewLine} />
          {dataInputs.length
            ? dataInputs.map((elt, index) => (
                <NewLineForm line={elt} key={index} addNewLine={addNewLine} />
              ))
            : ''}
        </div>
        <div className="container-button-submit">
          <button className="button-submit" type="submit">
            Valider la réception
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reception;
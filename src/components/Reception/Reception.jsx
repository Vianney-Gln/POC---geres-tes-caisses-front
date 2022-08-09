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

  const [dataInputs, setDataInputs] = useState([{}]); // state input data - array with objects

  // Function adding a new object in the state array dataInputs
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
          {dataInputs.length
            ? dataInputs.map((elt, index) => (
                <NewLineForm
                  dataInputs={dataInputs}
                  setDataInputs={setDataInputs}
                  line={elt}
                  key={index}
                  index={index}
                  addNewLine={addNewLine}
                />
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

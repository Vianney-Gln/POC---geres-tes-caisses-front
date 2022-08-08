import React, { useContext, useEffect, useState } from 'react';
// import context
import ContextArticles from '../../context/ContextArticles';
// import style css
import './reception.scss';

const Reception = () => {
  // Context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // States
  const [line, setLine] = useState(['']);

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);
  return (
    <div className="container-reception">
      <h2>Reception</h2>
      <form className="form-reception">
        <div className="container-form">
          {line.map((elt, index) => {
            return (
              <div key={index} className="newLine">
                <label htmlFor="idBoxe">
                  <span>Identifiant caisse:</span>
                  <input type="text" name="idBoxe"></input>
                </label>
                <label htmlFor="articleBoxe">
                  <span>type de caisse:</span>
                  <select>
                    <option>Value 1</option>
                  </select>
                </label>
                {index === line.length - 1 ? (
                  <label htmlFor="button-next-article">
                    <button
                      onClick={() => setLine((old) => [...old, elt])}
                      name="button-next-article"
                      type="button">
                      Article suivant
                    </button>
                  </label>
                ) : (
                  <label htmlFor="button-cancel">
                    <button className="red-button" name="button-cancel" type="button">
                      Annuler article
                    </button>
                  </label>
                )}
              </div>
            );
          })}
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

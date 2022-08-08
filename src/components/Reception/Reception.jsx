import React, { useContext, useEffect } from 'react';
// import context
import ContextArticles from '../../context/ContextArticles';
// import style css
import './reception.scss';

const Reception = () => {
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);
  return (
    <div className="container-reception">
      <h2>Reception</h2>
      <form className="form-reception">
        <div className="container-form">
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
          <label htmlFor="button-next-article">
            <button name="button-next-article" type="button">
              Article suivant
            </button>
          </label>
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

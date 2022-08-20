import React, { useEffect, useState } from 'react';
// import style css
import './createBundle.scss';
// import service
import getArticles from '../../../services/articles';

const CreateBundle = () => {
  const [listArticles, setListArticles] = useState([]); // state list articles

  useEffect(() => {
    getArticles().then((result) => {
      setListArticles(result.data);
    });
  }, []);
  return (
    <form className="form-createBundle">
      <h1>Création de fagot</h1>
      <label htmlFor="idFagot">
        <span>Nom du fagot:</span>
        <input placeholder="Fag-001" name="idFagot" type="text"></input>
      </label>
      <label htmlFor="idArticle">
        <span>Type de caisse:</span>
        <select name="idArticle">
          <option>--Choix--</option>
          {listArticles
            ? listArticles.map((article) => (
                <option value={article.id} key={article.id}>
                  {article.name}
                </option>
              ))
            : ''}
        </select>
      </label>
      <button type="submit">Créer fagot</button>
    </form>
  );
};

export default CreateBundle;

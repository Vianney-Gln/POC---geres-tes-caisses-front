import React, { useEffect, useState } from 'react';
// import style css
import './createBundle.scss';
// import service
import getArticles from '../../../services/articles';

const CreateBundle = () => {
  const [listArticles, setListArticles] = useState([]); // state list articles
  const [dataInput, setDataInput] = useState({ uuid: '', id_article: '' });

  // On Mounting component, get articles
  useEffect(() => {
    getArticles().then((result) => {
      setListArticles(result.data);
    });
  }, []);

  // Function getting data from inputs
  const getDataInputs = (value, key) => {
    const copy = { ...dataInput };
    copy[key] = value;
    setDataInput(copy);
    console.log(copy);
  };
  return (
    <form className="form-createBundle">
      <h1>Création de fagot</h1>
      <label htmlFor="idFagot">
        <span>Nom du fagot:</span>
        <input
          onChange={(e) => getDataInputs(e.target.value, 'uuid')}
          placeholder="Fag-001"
          value={dataInput.uuid}
          name="idFagot"
          type="text"></input>
      </label>
      <label htmlFor="idArticle">
        <span>Type de caisse:</span>
        <select
          value={dataInput.id_article}
          onChange={(e) => getDataInputs(e.target.value, 'id_article')}
          name="idArticle">
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

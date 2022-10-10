import React, { useEffect, useState, useContext } from 'react';
import './createBundle.scss';
import getArticles from '../../../../services/articles';
import createBundle from '../../../../services/bundle';
import ContextArticles from '../../../../context/ContextArticles';
import getDataInputs, { handleForm } from './util';

const CreateBundle = () => {
  const [listArticles, setListArticles] = useState([]); // state list articles
  const [dataInput, setDataInput] = useState({ uuid: '', id_article: '' }); // input to send to api
  const [error, setError] = useState(false); // boolean managing error
  const [message, setMessage] = useState(''); // success or error string message

  const contextArticles = useContext(ContextArticles);
  const { setAreActivateFilters } = contextArticles;

  // On Mounting component, get articles and disable the Menu Left
  useEffect(() => {
    setAreActivateFilters(false);
    getArticles().then((result) => {
      setListArticles(result.data);
    });
  }, []);

  return (
    <form
      onSubmit={(e) => handleForm(e, dataInput, createBundle, setError, setMessage, setDataInput)}
      className="form-createBundle">
      <h2>Création de fagot</h2>
      <label htmlFor="idFagot">
        <span>Nom du fagot:</span>
        <input
          onChange={(e) => getDataInputs(e.target.value, 'uuid', dataInput, setDataInput)}
          placeholder="Fag-001"
          value={dataInput.uuid}
          name="idFagot"
          type="text"></input>
      </label>
      <label htmlFor="idArticle">
        <span>Type de caisse:</span>
        <select
          value={dataInput.id_article}
          onChange={(e) => getDataInputs(e.target.value, 'id_article', dataInput, setDataInput)}
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
      <p className={error ? 'error' : 'success'}>{message && message}</p>
    </form>
  );
};

export default CreateBundle;

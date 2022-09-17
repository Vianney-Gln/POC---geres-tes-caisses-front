import React, { useEffect, useState, useContext } from 'react';
// import style css
import './createBundle.scss';
// import service
import getArticles from '../../../services/articles';
import createFagot from '../../../services/fagot';
// import component context
import ContextArticles from '../../../context/ContextArticles';

const CreateBundle = () => {
  // States
  const [listArticles, setListArticles] = useState([]); // state list articles
  const [dataInput, setDataInput] = useState({ uuid: '', id_article: '' }); // input to send to api
  const [error, setError] = useState(false); // boolean managing error
  const [message, setMessage] = useState(''); // success or error string message

  // Context
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // On Mounting component, get articles and disable the Menu Left
  useEffect(() => {
    setActivate(false);
    getArticles().then((result) => {
      setListArticles(result.data);
    });
  }, []);

  // Function getting data from inputs
  const getDataInputs = (value, key) => {
    const copy = { ...dataInput };
    copy[key] = value;
    setDataInput(copy);
  };

  // Function submitting form and verify if uuid is starting by Fag-
  const handleForm = (e) => {
    e.preventDefault();
    const regex = /^Fag-/;
    if (dataInput.uuid.match(regex)) {
      createFagot(dataInput)
        .then(() => {
          setError(false);
          setMessage('Fagot créé avec succés.');
          setTimeout(() => {
            setDataInput({ uuid: '', id_article: '' });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setMessage("Il y a eu une erreur, le fagot n'a pas été créé.");
        });
    } else {
      setError(true);
      setMessage("L'identifiant doit commencé par Fag-");
    }
  };
  return (
    <form onSubmit={(e) => handleForm(e)} className="form-createBundle">
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
      <p className={error ? 'error' : 'success'}>{message && message}</p>
    </form>
  );
};

export default CreateBundle;

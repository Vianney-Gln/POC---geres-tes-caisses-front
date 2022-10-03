import React, { useEffect, useState } from 'react';
import './newLineForm.scss';
import PropTypes from 'prop-types';
import getArticles from '../../services/articles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const NewLineForm = ({ addNewLine, index, dataInputs, setDataInputs, line }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((result) => setArticles(result.data))
      .catch((err) => console.log(err));
  }, []);

  // function deleting rows in the form
  const deleteRow = () => {
    const newDataInputs = [...dataInputs];
    newDataInputs.splice(index, 1);
    setDataInputs(newDataInputs);
  };

  /**
   * function getting data for each rows from form
   * @param {string} value
   * @param {string} key
   */
  const getInputData = (value, key) => {
    const copyArray = [...dataInputs];
    copyArray[index][key] = value;
    setDataInputs(copyArray);
  };

  return (
    <div className="newLine">
      <label htmlFor="idBoxe">
        <span>Identifiant caisse:</span>
        <input
          onChange={(e) => getInputData(e.target.value, 'uuid')}
          value={line.uuid}
          maxLength="10"
          type="text"
          name="idBoxe"
          placeholder={`${new Date().getFullYear()}....`}></input>
      </label>
      <label htmlFor="articleBoxe">
        <span>type de caisse:</span>
        <select onChange={(e) => getInputData(e.target.value, 'id_article')}>
          <option value="">--choix--</option>
          {articles.length
            ? articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.name}
                </option>
              ))
            : null}
        </select>
      </label>
      <div className="duo-buttons-container">
        {index === dataInputs.length - 1 ? (
          <label htmlFor="button-next-article">
            <button
              onClick={() => addNewLine(index, line)}
              name="button-next-article"
              type="button"
              title="Ajouter ligne">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </label>
        ) : (
          ''
        )}

        {dataInputs.length > 1 ? (
          <label htmlFor="button-cancel">
            <button
              onClick={() => deleteRow()}
              className="red-button"
              name="button-cancel"
              type="button"
              title="Supprimer ligne">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </label>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

NewLineForm.propTypes = {
  addNewLine: PropTypes.func,
  index: PropTypes.number,
  dataInputs: PropTypes.array,
  line: PropTypes.object,
  setDataInputs: PropTypes.func
};

export default NewLineForm;

import React from 'react';
// import PropTypes
import PropTypes from 'prop-types';

const NewLineForm = ({ addNewLine }) => {
  return (
    <div className="newLine">
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
        <button onClick={() => addNewLine()} name="button-next-article" type="button">
          Article suivant
        </button>
      </label>
      <label htmlFor="button-cancel">
        <button className="red-button" name="button-cancel" type="button">
          Annuler article
        </button>
      </label>
    </div>
  );
};

NewLineForm.propTypes = {
  addNewLine: PropTypes.func
};

export default NewLineForm;

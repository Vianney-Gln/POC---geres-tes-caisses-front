import React, { useEffect } from 'react';
// import PropTypes
import PropTypes from 'prop-types';

const NewLineForm = ({ addNewLine, index, dataInputs, setDataInputs }) => {
  const deleteRow = () => {
    const newDataInputs = [...dataInputs];
    newDataInputs.splice(index, 1);
    setDataInputs(newDataInputs);
  };

  useEffect(() => {
    console.log(dataInputs.length);
  }, [dataInputs]);

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
      {index === dataInputs.length - 1 ? (
        <label htmlFor="button-next-article">
          <button onClick={() => addNewLine()} name="button-next-article" type="button">
            Article suivant
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
            type="button">
            Annuler article
          </button>
        </label>
      ) : (
        ''
      )}
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

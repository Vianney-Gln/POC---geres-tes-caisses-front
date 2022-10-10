/**
 * function deleting rows in the reception form
 * @param {array} dataInputs
 * @param {function} setDataInputs
 * @param {number} index
 */
const deleteRow = (dataInputs, setDataInputs, index) => {
  const newDataInputs = [...dataInputs];
  newDataInputs.splice(index, 1);
  setDataInputs(newDataInputs);
};

/**
 * function getting data for each rows from form
 * @param {array} dataInputs
 * @param {function} setDataInputs
 * @param {string} value
 * @param {string} key
 * @param {number} index
 */
export const getInputData = (dataInputs, setDataInputs, value, key, index) => {
  const copyArray = [...dataInputs];
  copyArray[index][key] = value;
  setDataInputs(copyArray);
};

export default deleteRow;

/**
 * Function getting data from inputs
 * @param {string} value
 * @param {string} key
 * @param {array} dataInput
 * @param {function} setDataInput
 */
const getDataInputs = (value, key, dataInput, setDataInput) => {
  const copy = { ...dataInput };
  copy[key] = value;
  setDataInput(copy);
};

export default getDataInputs;

/**
 * Function getting or deleting data to the cliqued row --- out-of-stock use only
 * @param {array} selected
 * @param {object} element
 * @param {function} setSelected
 */
const handleSelect = (selected, element, setSelected) => {
  let copy = [...selected];
  if (copy.find((el) => el.id === element.id)) {
    copy = copy.filter((el) => el.id !== element.id);
  } else {
    copy.push(element);
  }
  setSelected(copy);
};

/**
 * Function getting or deleting data to the cliqued row --- bundling/bundle use only
 * @param {array} boxesToAdd
 * @param {function} getBundleBoxes
 * @param {object} element
 * @param {function} setBoxesToAdd
 * @param {object} currBundle
 */
export const addToBundle = (boxesToAdd, getBundleBoxes, element, setBoxesToAdd, currBundle) => {
  let copy = [...boxesToAdd];
  const sum = getBundleBoxes.length + copy.length;

  if (!copy.find((elt) => elt.id === element.id) && sum < 10 && element.name === currBundle.name) {
    copy.push(element);
    setBoxesToAdd(copy);
  }
  if (element.name !== currBundle.name)
    alert('Attention la taille de la caisse ne correspond pas à la taille du fagot');
};
export default handleSelect;

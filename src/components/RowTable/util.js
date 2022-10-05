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

export default handleSelect;

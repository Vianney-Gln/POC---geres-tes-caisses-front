/**
 * Function generating empty rows
 * @param {array} getBundleBoxes
 * @param {array} boxesToAdd
 * @param {string} operation
 * @returns
 */
const generateEmptyRows = (getBundleBoxes, boxesToAdd, operation) => {
  const maxRows = 10;
  const sum = getBundleBoxes.length + boxesToAdd.length;
  const diff = maxRows - sum;
  if (diff > 0) {
    const tempArray = new Array(diff).fill(undefined);
    return tempArray.map((_, index) => {
      return (
        <tr key={index}>
          <td align="center">----</td>
          <td align="center">----</td>
          <td align="center">----</td>
          {operation === 'bundle' && <td align="center">----</td>}
        </tr>
      );
    });
  }
};

/**
 * Function removing a boxe from one bundle during update
 * @param {object} element
 * @param {array} boxesToAdd
 * @param {function} setBoxesToAdd
 */
export const removeToBundle = (element, boxesToAdd, setBoxesToAdd) => {
  let copy = [...boxesToAdd];
  if (copy.find((el) => el.id === element.id)) {
    copy = copy.filter((el) => el.id !== element.id);
  }
  setBoxesToAdd(copy);
};

export default generateEmptyRows;

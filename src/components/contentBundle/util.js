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

/**
 * Function running the service function removeBoxeFromBundle then, manage messages and restart the useeffect
 * @param {function} removeBoxeFromBundle
 * @param {number} currentBoxeId
 * @param {function} setMessage
 * @param {function} setError
 * @param {function} setIsOperationOk
 * @param {function} handleRestartEffect
 * @param {function} setBoxesToAdd
 * @param {function} closeModal
 */
export const runRemoveBoxeFromBundle = (
  removeBoxeFromBundle,
  currentBoxeId,
  setMessage,
  setError,
  setIsOperationOk,
  handleRestartEffect,
  setBoxesToAdd,
  closeModal
) => {
  removeBoxeFromBundle(currentBoxeId)
    .then(() => {
      setMessage('Mise à jour du fagot en cours...');
      setError(false);
      setTimeout(() => {
        setIsOperationOk(true);
        setMessage('La caisse a été retirée avec succés.');
      }, 3000);
      setTimeout(() => {
        setIsOperationOk(false);
        setMessage('');
        handleRestartEffect();
        setBoxesToAdd([]);
        closeModal();
      }, 6000);
    })
    .catch(() => {
      setError(true);
      setIsOperationOk(true);
      setMessage('Une erreur est survenue pendant la mise à jour');
      setTimeout(() => {
        closeModal();
      }, 3000);
    });
};

export default generateEmptyRows;

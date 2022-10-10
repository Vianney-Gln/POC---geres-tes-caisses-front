/**
 * Function managin the display buttons "sortir du stock" et "annuler selection"
 * @param {function} setSelected
 * @param {function} openModal
 * @returns
 */
const manageButtons = (setSelected, openModal) => {
  if (location.pathname.includes('/stock')) {
    return '';
  } else if (location.pathname.includes('/out-of-stock')) {
    return (
      <>
        <button onClick={() => cancelSelection(setSelected)} type="button">
          Annuler selection
        </button>
        <button onClick={() => openModal()} type="button">
          Valider sorties
        </button>
      </>
    );
  }
};

/**
 * Function that cancel all selection reseting selected statement
 * @param {function} setSelected
 */
export const cancelSelection = (setSelected) => {
  setSelected([]);
};

export default manageButtons;

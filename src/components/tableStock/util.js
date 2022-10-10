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

/**
 * Function managin caption title
 * @param {string} captionName
 * @returns
 */
export const manageCaptionTitle = (captionName) => {
  if (captionName) return captionName;
  return 'toutes caisses';
};

/**
 * Function running the service function outOfStock, manage error or success messages and redirect stock page
 * @param {array} selected
 * @param {function} outOfStock
 * @param {function} setErrorDelete
 * @param {function} setConfirmDelete
 * @param {function} navigate
 */
export const runOutOfStock = (selected, outOfStock, setErrorDelete, setConfirmDelete, navigate) => {
  const ids = selected.map((el) => el.id);
  outOfStock(ids)
    .then(() => {
      setErrorDelete(false);
      setConfirmDelete('Les éléments sont correctements sortis du stock.');
      setTimeout(() => {
        setConfirmDelete('redirection page stock en cours...');
      }, 2000);
    })
    .then(() => {
      setTimeout(() => {
        navigate('/');
      }, 4000);
    })
    .catch(() => {
      setErrorDelete(true);
      setConfirmDelete('Il y eu une erreur durant la suppression');
    });
};
export default manageButtons;

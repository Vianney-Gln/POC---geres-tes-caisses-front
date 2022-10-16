/**
 * Function returning the current date
 * @returns
 */
const getTodaysDate = () => {
  const date = new Date();
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return dateStr;
};

/**
 * Function returning the designation from a boxe as a string
 * @param {number} id_article
 * @returns string
 */
export const getDesignationBoxes = (id_article) => {
  switch (id_article) {
    case 1:
      return 'caisse 4m';

    case 2:
      return 'caisse 4m20';

    case 3:
      return 'caisse 4m60';

    default:
      '';
  }
};

export default getTodaysDate;

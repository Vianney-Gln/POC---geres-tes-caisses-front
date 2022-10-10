/**
 * Function that generates the first part of the link, depending of location statement
 * @param {string} location
 * @param {number} currentIdBundle
 * @returns
 */
const generateUrl = (location, currentIdBundle) => {
  if (location.includes('/out-of-stock')) return '/out-of-stock';
  if (location.includes('/stock')) return '/stock';
  if (location.includes('/bundling/bundle') && currentIdBundle) {
    return `/bundling/bundle/${currentIdBundle}`;
  }
};

/**
 * Function generating the type of boxes as a string, depending of idArticles statement - for the count boxes area
 * @param {number} idArticles
 * @returns
 */
export const generateNameSizeBoxes = (idArticles) => {
  switch (idArticles) {
    case 1:
      return ' 4m';
    case 2:
      return ' 4m20';
    case 3:
      return ' 4m60';
    default:
      return ' toutes caisses';
  }
};

export default generateUrl;

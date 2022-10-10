// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Function managing icon, depending of error state
 * @param {bool} error
 * @returns
 */
const manageIcon = (error) => {
  if (error)
    return (
      <i className="symbol red">
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </i>
    );
  return (
    <i className="symbol green">
      <FontAwesomeIcon icon={faSquareCheck} />
    </i>
  );
};

export default manageIcon;

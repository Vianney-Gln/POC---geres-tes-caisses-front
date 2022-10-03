import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContextArticles from '../../context/ContextArticles';
import ContextBundles from '../../context/ContextBundles';
import './contentBundle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
import { getBoxesByBundle } from '../../services/stock';
import { getInfoBundleById, removeBoxeFromBundle } from '../../services/bundle';
import { updateBundleById } from '../../services/bundle';
import PropTypes from 'prop-types';
import ModalComponent from '../Modal/ModalComponent';

const ContentBundle = ({ operation }) => {
  const contextArticles = useContext(ContextArticles);
  const contextBundles = useContext(ContextBundles);
  const { setActivate } = contextArticles; // able - disable filters
  const {
    boxesToAdd,
    setBoxesToAdd,
    getBundleBoxes,
    setGetBundleBoxes,
    currBundle,
    setCurrBundle,
    handleRestartEffect,
    restartEffect
  } = contextBundles;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [contentLabel, setContentLabel] = useState('');
  const [error, setError] = useState(false);
  const [isOperationOk, setIsOperationOk] = useState(false);
  const [currentBoxeId, setCurrentBoxeId] = useState(null);

  // function closing the modal
  const openModal = () => {
    setModalIsOpen(true);
  };
  // function opening the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const param = useParams();

  // Function setting the boxes statement and disable filters on mounting component
  useEffect(() => {
    if (location.pathname.includes('/bundling/bundle')) {
      setActivate(true);
    } else {
      setActivate(false);
    }
  }, [boxesToAdd]);

  // Function removing all selected boxes if this componant unmount
  useEffect(() => {
    return () => setBoxesToAdd([]);
  }, []);

  // Function getting boxes from one fagot
  useEffect(() => {
    getBoxesByBundle(param.id)
      .then((result) => {
        setGetBundleBoxes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [restartEffect]);

  /**
   * Function generating empty rows
   * @returns
   */
  const generateEmptyRows = () => {
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

  // On component mounting get the uuid of the current fagot (displayed in the caption)
  useEffect(() => {
    getInfoBundleById(param.id)
      .then((result) => {
        setCurrBundle(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**
   * Function removing a boxe from one bundle during update
   * @param {object} element
   */
  const removeToBundle = (element) => {
    let copy = [...boxesToAdd];
    if (copy.find((el) => el.id === element.id)) {
      copy = copy.filter((el) => el.id !== element.id);
    }
    setBoxesToAdd(copy);
  };

  /**
   * Function running the service function updateBundleById, manage messages success or errors and then redirect to stock component
   */
  const runUpdateBundleByid = () => {
    updateBundleById(boxesToAdd, currBundle.id)
      .then(() => {
        setMessage('Mise à jour du fagot en cours...');
        setError(false);
        setTimeout(() => {
          setIsOperationOk(true);
          setMessage('Fagot mis à jour avec succés.');
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

  /**
   * Function running the service function removeBoxeFromBundle then, manage messages and restart the useeffect
   */
  const runRemoveBoxeFromBundle = () => {
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

  return (
    <div className="container-contentFagot">
      <ModalComponent
        error={error}
        message={message}
        open={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel={contentLabel} //"Modal-bundling"
        runUpdateBundleByid={runUpdateBundleByid}
        isOperationOk={isOperationOk}
        runRemoveBoxeFromBundle={runRemoveBoxeFromBundle}
      />
      <table className="table-boxes-fagots">
        <caption className="caption">
          {operation === 'bundle' ? 'Mise à jour' : 'Constitution'} du{' '}
          {currBundle.uuid ? currBundle.uuid : 'fagot'}
          <br></br>
          <span className="info-fagot">{currBundle.name}</span>
          <span className="info-fagot"> {getBundleBoxes.length + boxesToAdd.length} /10</span>
          {operation === 'bundle' && boxesToAdd.length ? (
            <button
              onClick={() => {
                setContentLabel('Modal-bundling');
                openModal();
              }}
              type="button">
              Mise à jour fagot
            </button>
          ) : (
            ''
          )}
        </caption>
        <thead>
          <tr align="center">
            <th>identifiant</th>
            <th>désignation</th>
            <th>numéro fagot</th>
            {operation === 'bundle' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {getBundleBoxes &&
            getBundleBoxes.map((element, index) => {
              return (
                <tr key={index}>
                  <td align="center">{element.idCaisse}</td>
                  <td align="center">{element.name}</td>
                  <td align="center">{element.idFagot}</td>
                  {operation === 'bundle' && (
                    <td className="red" title="supprimer du fagot" align="center">
                      <i
                        onClick={() => {
                          setContentLabel('Modal-remove-from-bundle');
                          setCurrentBoxeId(element.uid);
                          openModal();
                        }}>
                        <FontAwesomeIcon icon={faArrowTurnRight} />
                      </i>
                    </td>
                  )}
                </tr>
              );
            })}
          {operation === 'bundle' && boxesToAdd.length
            ? boxesToAdd.map((elt, index) => {
                return (
                  <tr className="justAdded" key={index}>
                    <td align="center">{elt.uuid}</td>
                    <td align="center">{elt.name}</td>
                    <td align="center">{currBundle.uuid}</td>
                    <td className="delete" onClick={() => removeToBundle(elt)} align="center">
                      Annuler
                    </td>
                  </tr>
                );
              })
            : ''}
          {generateEmptyRows()}
        </tbody>
      </table>
    </div>
  );
};

ContentBundle.propTypes = {
  operation: PropTypes.string
};

export default ContentBundle;

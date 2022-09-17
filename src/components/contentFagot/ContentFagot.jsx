// import react hooks
import React, { useEffect, useContext, useState } from 'react';
// react router dom
import { useParams } from 'react-router-dom';
// import Components context
import ContextArticles from '../../context/ContextArticles';
import ContextFagots from '../../context/ContextFagots';
// import style css
import './contentFagot.scss';
// import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnRight } from '@fortawesome/free-solid-svg-icons';
// import service
import { getBoxeByFagot } from '../../services/stock';
import { getInfoFagotById, removeBoxeFromBundle } from '../../services/fagot';
import { updateBundleById } from '../../services/fagot';
// import PropTypes
import PropTypes from 'prop-types';
// Import component
import ModalComponent from '../Modal/ModalComponent';

const ContentFagot = ({ operation }) => {
  // context
  const contextArticles = useContext(ContextArticles);
  const contextFagots = useContext(ContextFagots);
  const { setActivate } = contextArticles; // able - disable filters
  const {
    boxesToAdd,
    setBoxesToAdd,
    fagotBoxes,
    setFagotBoxes,
    currFagot,
    setCurrFagot,
    handleRestartEffect,
    restartEffect
  } = contextFagots;
  // States
  const [open, setOpen] = useState(false); // state managing the modal
  const [message, setMessage] = useState(''); // state managing success or fail message
  const [contentLabel, setContentLabel] = useState(''); // state managin the content label modal
  const [error, setError] = useState(false); // this state bool manage the color of modal icons(error or success)
  const [updateOperationOk, setUpdateOperationOk] = useState(false); // state determine the display of icon
  const [currentBoxeId, setCurrentBoxeId] = useState(null); // state managing the current selected boxe id

  // Modals

  // function closing the modal
  const openModal = () => {
    setOpen(true);
  };
  // function opening the modal
  const closeModal = () => {
    setOpen(false);
  };

  // params
  const param = useParams();

  // Function setting the boxes statement and disable filters
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
    getBoxeByFagot(param.id)
      .then((result) => {
        setFagotBoxes(result.data);
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
    const sum = fagotBoxes.length + boxesToAdd.length;
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
    getInfoFagotById(param.id)
      .then((result) => {
        setCurrFagot(result.data);
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
    updateBundleById(boxesToAdd, currFagot.id)
      .then(() => {
        setMessage('Mise à jour du fagot en cours...');
        setError(false);
        setTimeout(() => {
          setUpdateOperationOk(true);
          setMessage('Fagot mis à jour avec succés.');
        }, 3000);
        setTimeout(() => {
          setUpdateOperationOk(false);
          setMessage('');
          handleRestartEffect();
          setBoxesToAdd([]);
          closeModal();
        }, 6000);
      })
      .catch(() => {
        setError(true);
        setUpdateOperationOk(true);
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
          setUpdateOperationOk(true);
          setMessage('La caisse a été retirée avec succés.');
        }, 3000);
        setTimeout(() => {
          setUpdateOperationOk(false);
          setMessage('');
          handleRestartEffect();
          setBoxesToAdd([]);
          closeModal();
        }, 6000);
      })
      .catch(() => {
        setError(true);
        setUpdateOperationOk(true);
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
        open={open}
        openModal={openModal}
        closeModal={closeModal}
        contentLabel={contentLabel} //"Modal-bundling"
        runUpdateBundleByid={runUpdateBundleByid}
        updateOperationOk={updateOperationOk}
        runRemoveBoxeFromBundle={runRemoveBoxeFromBundle}
      />
      <table className="table-boxes-fagots">
        <caption className="caption">
          {operation === 'bundle' ? 'Mise à jour' : 'Constitution'} du{' '}
          {currFagot.uuid ? currFagot.uuid : 'fagot'}
          <br></br>
          <span className="info-fagot">{currFagot.name}</span>
          <span className="info-fagot"> {fagotBoxes.length + boxesToAdd.length} /10</span>
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
          {fagotBoxes &&
            fagotBoxes.map((element, index) => {
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
                    <td align="center">{currFagot.uuid}</td>
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

ContentFagot.propTypes = {
  operation: PropTypes.string
};

export default ContentFagot;

/**
 * Function managing errors by generating differents messages
 * @param {string} errorServerMessage
 * @param {function} setMessageError
 */
const manageErrorsServerReception = (errorServerMessage, setMessageError) => {
  const year = new Date().getFullYear().toString();
  switch (true) {
    case errorServerMessage.includes('one or more identifiants already exist'):
      setMessageError('Un ou plusieurs identifiants existent déjà.');
      break;
    case errorServerMessage.includes('length must be 10 characters long'):
      setMessageError("L'identifiant doit être composé de 10 caratères. ");
      break;
    case errorServerMessage.includes('is required'):
      setMessageError('Tous les champs doivent être remplis');
      break;
    case errorServerMessage.includes('is not allowed to be empty'):
      setMessageError('Tous les champs doivent être remplis');
      break;
    case errorServerMessage.includes('fails to match the required pattern: /^[0-9]+$/'):
      setMessageError("L'identifiant doit être constitué de caractères numériques uniquement");
      break;
    case errorServerMessage.includes(`fails to match the required pattern: /^${year}/i`):
      setMessageError("L'identifiant doit commencé par l'année en cours ex:2022");
      break;
    default:
      setMessageError("Une erreur inattendue s'est produite");
  }
};

export default manageErrorsServerReception;

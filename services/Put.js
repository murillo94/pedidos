import initFirebase from './Api';

const Put = async (collection, token, values) => {
  const firebase = await initFirebase();

  const init = token
    ? firebase.collection(collection).doc(token)
    : firebase.collection(collection).doc();

  const result = await new Promise((resolve, reject) => {
    init
      .set(values)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject(); // eslint-disable-line prefer-promise-reject-errors
      });
  });

  return result;
};

export default Put;

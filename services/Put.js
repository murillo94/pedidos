import initFirebase from './Api';

const Put = async (collection, token, values) => {
  const firebase = await initFirebase();

  const init = token
    ? firebase
        .collection(collection)
        .doc(token)
        .set(values)
    : firebase.collection(collection).add(values);

  const result = await new Promise((resolve, reject) => {
    init
      .then(ref => {
        resolve((ref && ref.id) || token);
      })
      .catch(() => {
        reject(); // eslint-disable-line prefer-promise-reject-errors
      });
  });

  return result;
};

export default Put;

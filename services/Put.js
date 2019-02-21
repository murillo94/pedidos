import initFirebase from './Api';

const Put = async (collection, token, values) => {
  const firebase = await initFirebase();
  const init = token
    ? firebase
        .collection(collection)
        .doc(token)
        .set(values)
    : firebase.collection(collection).add(values);
  const result = await init
    .then(ref => {
      return (ref && ref.id) || token;
    })
    .catch(error => {
      throw Error(error);
    });

  return result;
};

export default Put;

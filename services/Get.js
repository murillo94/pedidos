import initFirebase from './Api';

const Get = async (collection, field) => {
  const firebase = await initFirebase();
  const result = await firebase
    .collection(collection)
    .orderBy(field, 'desc')
    .get()
    .then(snapshot => {
      const data = [];
      snapshot.forEach(doc => {
        data.push({ ...doc.data(), token: doc.id });
      });
      return data;
    })
    .catch(error => {
      throw Error(error);
    });

  return result;
};

export default Get;

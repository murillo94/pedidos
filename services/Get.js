import initFirebase from './Api';

const Get = async (collection, field) => {
  const firebase = await initFirebase();
  const result = await new Promise((resolve, reject) => {
    firebase
      .collection(collection)
      .orderBy(field, 'desc')
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), token: doc.id });
        });
        resolve(data);
      })
      .catch(() => {
        reject([]); // eslint-disable-line prefer-promise-reject-errors
      });
  });

  return result;
};

export default Get;

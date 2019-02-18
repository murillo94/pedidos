import initFirebase from './Api';

const GetOrders = async () => {
  const firebase = await initFirebase();
  const result = await new Promise((resolve, reject) => {
    firebase
      .collection('requests')
      .orderBy('date', 'desc')
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push(doc.data());
        });
        resolve(data);
      })
      .catch(() => {
        reject([]); // eslint-disable-line prefer-promise-reject-errors
      });
  });

  return result;
};

export default GetOrders;

import initFirebase from './Api';

/* const data = [
  {
    id: 1,
    clientId: 3,
    clientName: 'Luke Skywalker',
    profitability: 'high',
    items: []
  },
  {
    id: 2,
    clientId: 1,
    clientName: 'Darth Vader',
    profitability: 'medium',
    items: []
  },
  {
    id: 3,
    clientId: 2,
    clientName: 'Obi-Wan Kenobi',
    profitability: 'high',
    items: []
  }
]; */

const GetRequests = async () => {
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

export default GetRequests;

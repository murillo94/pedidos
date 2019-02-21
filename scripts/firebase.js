import initFirebase from '../services/Api';

import { customers, products, orders } from './data';

const batchDocs = async (collection, values) => {
  console.log(`Creating ${collection}`);

  const db = await initFirebase();
  const colRef = db.collection(collection);

  const batch = db.batch();

  values.forEach(item => {
    const ref = colRef.doc();
    batch.set(ref, {
      ...item
    });
  });

  return batch
    .commit()
    .then(() => {
      console.log(`Finished ${collection}`);
    })
    .catch(error => {
      console.log(`Error in ${collection}: ${error}`);
    });
};

(async () => {
  try {
    await batchDocs('customers', customers);
    await batchDocs('products', products);
    await batchDocs('orders', orders);
    process.exit();
  } catch (error) {
    console.log(`Something went wrong -> ${error}`);
    process.exit();
  }
})();

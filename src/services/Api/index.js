import firebase from 'firebase/app';
import 'firebase/firestore';
import configFirebase from './configFirebase';

const initFirebase = () => {
  try {
    firebase.initializeApp(configFirebase);
  } catch (error) {
    if (!/already exists/.test(error.message)) {
      console.log(`Firebase didn't initialize correctly: ${error.message}`);
    }
  }

  return firebase.firestore();
};

export default initFirebase;

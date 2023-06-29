import { initializeApp } from 'firebase/app';
import {getDatabase, onValue, ref, push, get, child, set, orderByValue} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBUF3dYpRpKobJNBXtBQGEsYS4VZ3i7xZE",
  authDomain: "spotify-queue-e14a4.firebaseapp.com",
  databaseURL: "https://spotify-queue-e14a4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spotify-queue-e14a4",
  storageBucket: "spotify-queue-e14a4.appspot.com",
  messagingSenderId: "842101299702",
  appId: "1:842101299702:web:1fe1ed38ec0737b3ff8fd7",
  measurementId: "G-KF41K6XC95"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export async function getCities() {
  onValue(ref(db, '/test'), (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });
}

export function getQueueItems(queueId){
  return onValue(ref(db, '/'+queueId+'/queue/'), (snapshot) => {
    const data = snapshot.val()
    return data 
  })
}

export function getStaticQueue(queueId){
  get(child(ref(db), `${queueId}/queue/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}
export { db }


export function addToQueue(queueId, song) {
  const queueListRef = ref(db, '1234/queue/')
  const newQueueRef = push(queueListRef, orderByValue('favourites'))
  const newItem = {
    song,
    favourites: 1
  }
  set(newQueueRef, newItem)
}

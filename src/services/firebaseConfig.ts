import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAPRN6DtG__w7SLKFPhTS2w_pF2amJ0q-I',
  authDomain: 'mammothcavesky.firebaseapp.com',
  projectId: 'mammothcavesky',
  databaseURL: 'https://mammothcavesky-default-rtdb.firebaseio.com',
  storageBucket: 'mammothcavesky.appspot.com',
  messagingSenderId: '43490740372',
  appId: '1:43490740372:web:bbd5dbe16a6726cb2ccc81',
  measurementId: 'G-ZTBL2M0DP2',
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const auth = getAuth(app)

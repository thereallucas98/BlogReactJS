import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCSJ-I5oSOtZELnrCJ2eYW7mYNG2Dr1WEo",
  authDomain: "meuapp-31f1e.firebaseapp.com",
  databaseURL: "https://meuapp-31f1e.firebaseio.com",
  projectId: "meuapp-31f1e",
  storageBucket: "meuapp-31f1e.appspot.com",
  messagingSenderId: "19079705560",
  appId: "1:19079705560:web:f5513e17a026f9cc89b8ad",
  measurementId: "G-G3J7KKDT21"
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);

  }

  logout() {
    return app.auth().signOut();
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    });
  }

  isInitialiazed() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback) {
    if (!app.auth().currentUser) {
      return null;
    }

    const uid = app.auth().currentUser.uid;

    await app.database().ref('usuarios').child(uid).once('value').then(callback)
  }
}

export default new Firebase();
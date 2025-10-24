export const firebase = initFirebase();

function initFirebase() {
  const firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");

  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.b,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };

  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

  return firebase;
}

export function loginFirebase(firebase, user) {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(result => {
      return true;
      //console.log(result);
    }).catch(error => {
      //console.log(error.code);
      if (error.code === 'auth/invalid-email') return 'No es un formato e-mail válido';
      else if (error.code === 'auth/wrong-password') return 'Contraseña incorrecta';
      else if (error.code === 'auth/user-not-found') return 'No existe usuario con este email';
    });
  })
  .catch(error => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
  });
}

export function outFirebase(firebase) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

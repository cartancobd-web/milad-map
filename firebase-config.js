const firebaseConfig = {
  apiKey: "AIzaSyAETli2UtjPzEU5xd9U6_W7xeJxBGq3xV8",
  authDomain: "milad-4727b.firebaseapp.com",
  projectId: "milad-4727b",
  storageBucket: "milad-4727b.firebasestorage.app",
  messagingSenderId: "1088600725533",
  appId: "1:1088600725533:web:f4bdacb68606f846590ef4",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const db = firebase.firestore();


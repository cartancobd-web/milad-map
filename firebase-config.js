const firebaseConfig = {
  apiKey: "AIzaSyAETli2UtjPzEU5xd9U6_W7xeJxBGq3xV8",
  authDomain: "milad-4727b.firebaseapp.com",
  projectId: "milad-4727b",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const db = firebase.firestore();

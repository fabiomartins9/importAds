// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Ou qualquer outro serviço que você precise

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "import-tax",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


// Verifique se o Firebase já não está inicializado para evitar erros
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Opcional: Configure outros serviços Firebase que você deseja usar, como Firestore, Authentication, etc.
  
  // Exemplo de exportação do Firestore (adicione outros serviços conforme necessário)
 
//   const analytics = getAnalytics();


  
  export { firebase}



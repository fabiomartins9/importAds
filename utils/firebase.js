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
  apiKey: "AIzaSyCPleLTdwLGOGEvUEPCoiXSIhLa4j3hLcg",
  authDomain: "import-tax.firebaseapp.com",
  projectId: "import-tax",
  storageBucket: "import-tax.appspot.com",
  messagingSenderId: "379270476272",
  appId: "1:379270476272:web:398f60e68ee7b324142d35",
  measurementId: "G-5J6RLQF5RM"
};


// Verifique se o Firebase já não está inicializado para evitar erros
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Opcional: Configure outros serviços Firebase que você deseja usar, como Firestore, Authentication, etc.
  
  // Exemplo de exportação do Firestore (adicione outros serviços conforme necessário)
 
//   const analytics = getAnalytics();


  
  export { firebase}



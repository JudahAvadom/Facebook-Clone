import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyADx5Pb8io3nPZk47pyCTmZZsdCTWIsn5w",
    authDomain: "facebook-clone-68066.firebaseapp.com",
    projectId: "facebook-clone-68066",
    storageBucket: "facebook-clone-68066.appspot.com",
    messagingSenderId: "279127364079",
    appId: "1:279127364079:web:4c32188e7f457cd07ca61a",
    measurementId: "G-8T5KKLSEE5"
}

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage }
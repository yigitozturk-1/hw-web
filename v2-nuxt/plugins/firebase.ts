import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
    // TODO: Replace with your actual Firebase project configuration
    const firebaseConfig = {
       
    };



    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    return {
        provide: {
            db,
            auth
        }
    };
});

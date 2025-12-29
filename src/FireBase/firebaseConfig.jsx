
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getFirestore,addDoc,collection} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import { useNavigate } from "react-router-dom";





const firebaseConfig = {
    apiKey: "AIzaSyAhEeHpybdeYmKZQneevkkoCJznu3J9P_g",
    authDomain: "lairry-student-dashboard.firebaseapp.com",
    projectId: "lairry-student-dashboard",
    storageBucket: "lairry-student-dashboard.firebasestorage.app",
    messagingSenderId: "86764598408",
    appId: "1:86764598408:web:feb207d3da2c84d3411b3d"
};



const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db=getFirestore(firebaseApp)
const FirebaseContext = createContext(null);

  const navigate = useNavigate();


  export const useFirebase = () => useContext(FirebaseContext)




export const FirebaseProvider = (props) => {

    const signUpUserWithEmailAndPassword = async(email, password) => {
        return await createUserWithEmailAndPassword(firebaseAuth, email, password)
        
        .then(async(userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log(user);
        // ...
        try{
        const docRef = await addDoc(collection(db,"users"),{
            email:`${user.email}`,
            userId:`${user.uid}`,
            password:`${user.password}`,
            role:"Student",
            createdAt: new Date()
        })
    navigate("/")
        }
        
        catch(error){ 
            alert("Error Occured:- ",error.message)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });

    }
const signInUser = async(email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("Success!!")
        alert("Login Successful! ")
        navigate("/")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

  };
      const forgotPassword=()=>{
      
          
      sendPasswordResetEmail(firebaseAuth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          alert("Password has been sent successfully to your registered email!!")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorMessage)
        });
        }
    return (
        <FirebaseContext.Provider 
        value={{signUpUserWithEmailAndPassword,signInUser,signUpWithFacebook,signUpWithGoogle,forgotPassword}}>
            {props.children}
        </FirebaseContext.Provider>
    )
}



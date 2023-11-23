/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase/firebase.config";
import axios from "axios";
// import Swal from "sweetalert2";

const provider = new GoogleAuthProvider();

export const context = createContext(null);

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedEmail = { email: userEmail };
      setUser(currentUser);
      setLoading(false);
      // if user exist than issue a token
      if (currentUser) {
        // setLoading(true);
        axios
          .post("https://hotel-server-nu.vercel.app/jwt", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data));
        // setLoading(false);
      } else {
        // setLoading(true);
        axios
          .post("https://hotel-server-nu.vercel.app/logout", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data));
        // .catch((err) => {
        //   if (err) {
        //     Swal.fire("please login");
        //   }
        // });
        // setLoading(false);
      }
    });
    return () => unSubscribe;
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    createUser,
    logInUser,
    logOutUser,
    googleLogIn,
  };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default Provider;

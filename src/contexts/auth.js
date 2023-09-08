import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/Banco/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigate = useNavigate();

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password).then(
      async (value) => {
        let uid = value.user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          name: docSnap.data().name,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        }
        setUser(data);
        setLoadingAuth(false);
        toast.success("Welcome to the system");
        navigate("/dashboard");
    })
    .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error("Error logging in");
        });
  }

  async function signUp(email, password, name) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          name: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(data);
          setLoadingAuth(false);
          toast.success("Welcome to the system");
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

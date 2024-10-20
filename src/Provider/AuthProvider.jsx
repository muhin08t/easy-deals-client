import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import app from './../Firebase/Firebase.config';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const createUser = async (email,
    password,
    name,
    phone,
    photo,
    address) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Send user data to backend
      const response = await fetch(
        "http://localhost:5000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: newUser.uid,
            email: newUser.email,
            displayName: name || "User",
            phone: phone,
            photoUrl: photo || "https://i.ibb.co/k6hTYW1/Alien-Dev.jpg",
            address: address,
            isAdmin: false, // Default role
            isBlocked: false, // Default status
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user data.");
      }
      return newUser;
    } catch (error) {
      console.error("Registration failed:", error.message);
      throw error; // Re-throw error for further handling if needed
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const githubSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    updateUserProfile,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

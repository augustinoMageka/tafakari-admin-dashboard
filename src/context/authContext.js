import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/services/firebase";
import { useUpdateLoadingContext } from "./loadingContext";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const setLoading = useUpdateLoadingContext();
  const [userVal, setUser] = useState(null);
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [userVal]);
  return (
    <AuthContext.Provider value={userVal}>{children}</AuthContext.Provider>
  );
}

import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Firebase from "@/auth/firebase/config";
import { InfinitySpin } from "react-loader-spinner";
const auth = getAuth(Firebase);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <InfinitySpin width="400" color="#DC2626" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

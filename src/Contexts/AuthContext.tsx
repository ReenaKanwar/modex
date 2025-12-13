import { createContext, useContext } from "react";

const AuthContext = createContext({ isAdmin: false });

export const AuthProvider = ({ children }: any) => {
  return (
    <AuthContext.Provider value={{ isAdmin: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

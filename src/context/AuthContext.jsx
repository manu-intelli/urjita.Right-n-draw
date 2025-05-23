import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("AuthContext login", userData);
    setUser(userData);
    console.log("AuthContext login setUser", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  console.log("AuthContext user", user);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
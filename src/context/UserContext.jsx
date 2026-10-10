// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

function loadUser() {
  try {
    const saved = localStorage.getItem('sproutline_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sproutline_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sproutline_user');
    }
  }, [user]);

  const login = (email, _password) => {
    // Any email/password is accepted (frontend-only demo)
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const userObj = { email, name, isGuest: false };
    setUser(userObj);
    return userObj;
  };

  const continueAsGuest = () => {
    const guestObj = { email: null, name: 'Guest', isGuest: true };
    setUser(guestObj);
    return guestObj;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, continueAsGuest, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};

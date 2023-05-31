import React, { createContext, useState } from 'react';

// Create a new context
export const UserContext = createContext({
    setUserAuth: () => null,
    userAuth: null,
    setBusinessAccountId: () => null,
    businessAccountId: null,
  });
  export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [businessAccountId, setBusinessAccountId] = useState(null);
    const value = { userAuth, setUserAuth, businessAccountId, setBusinessAccountId };
  

   //console.log(userAuth)
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };
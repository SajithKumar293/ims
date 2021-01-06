import React, { createContext, useState, useEffect} from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });
  const [role, setRole] = useState({ data: null });
  const [userID, setUser] = useState({ data: null });

  const setAuthData = (data) => {
    setAuth({data: data});
  };

  const setUserID = (data) => {
    setUser({data: data});
  };

  const setRoleData = (data) => {
    setRole({data: data});
  };
 
  useEffect(() => {
    setAuth({ loading: false, data: JSON.parse(window.localStorage.getItem('authData'))});
    setRole({ data: JSON.parse(window.localStorage.getItem('userRole'))});
    setUser({ data: JSON.parse(window.localStorage.getItem('userID'))});
  }, []);
//2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false. 
//This function will be executed every time component is mounted (every time the user refresh the page);

  useEffect(() => {
    window.localStorage.setItem('authData', JSON.stringify(auth.data));
  }, [auth.data]);
// 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.

  useEffect(() => {
    window.localStorage.setItem('userRole', JSON.stringify(role.data));
  }, [role.data]);

  useEffect(() => {
    window.localStorage.setItem('userID', JSON.stringify(userID.data));
  }, [userID.data]);

  return (
    <authContext.Provider value={{ auth, setAuthData, role, setRoleData, userID, setUserID }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
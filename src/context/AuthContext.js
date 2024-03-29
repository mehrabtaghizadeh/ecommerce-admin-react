import {createContext, useMemo, useState} from "react";
import BASE_URL from "../utils/BASE_URL";


export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [userId,setUserId] = useState(null);
  const [userRole,setUserRole] = useState(null);

  useMemo(() => {
    if (!user) {
      fetch(`${BASE_URL}/auth/profile`,{
        credentials:'include'
      }).then(res => res.json()).then(data => {
        const name = data.username
        const id = data.id
        const admin = data.isAdmin
        setUser(name)
        setUserId(id)
        setUserRole(admin)
      });
    }
  },[user]);
  return (
    <UserContext.Provider value={{user,setUser,userId,setUserId,userRole,setUserRole}}>
      {children}
    </UserContext.Provider>
  );
}

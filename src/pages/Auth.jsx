import {useState,useEffect, useContext} from 'react'
import BASE_URL from '../utils/BASE_URL'
import { UserContext } from '../context/AuthContext'

function Auth({children}) {
 const [auth,setAuth] = useState(null)
 const {userRole} = useContext(UserContext)
 useEffect(()=>{
      fetch(`${BASE_URL}/auth/profile`,{
            credentials:'include'
          }).then(res => res.json()).then(data => {
            setAuth(data.isAdmin)})
 },[])
 if(auth === true &&  userRole === true) {
      return children;
 }
 return null;
}

export default Auth
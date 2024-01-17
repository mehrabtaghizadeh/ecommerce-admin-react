import React,{useEffect, useState} from 'react'
import { EditIcon } from '../components/icons/EditIcon'
import { DeleteIcon } from '../components/icons/DeleteIcon'
import {useQuery} from 'react-query'
import BASE_URL from '../utils/BASE_URL'
import Lodding from '../components/Lodding'
import UserChart from '../components/UserChart'

function Users() {
    const [users,setUsers] = useState([])
    useEffect(() => {
    function fetchFunc() {
        fetch(`${BASE_URL}/auth/alluser`,{
            credentials:'include'
        })
       .then((res) => res.json())
       .then( data => {setUsers(data)}) 
        
    }
    fetchFunc()
   },[users]);



  return (
    <>
    <h3 className='px-8 py-4 text-blue text-xl font-bold'>کاربر ها</h3> 
    <UserChart/>
    <div className="relative  rounded-md shadow border border-gary mx-14 mt-12 max-lg:mx-12 max-lg:mr-8 max-sm:mx-8">
    <table className="w-full text-sm rtl:text-right">
        <thead className="text-xs uppercase border-b-1 border-gary max-sm:px-2  text-darkblue">
            <tr>
                <th scope="col" className="px-6 py-4">
                    نام کاربری
                </th>
                <th scope="col" className="px-6 py-4">
                    ایمیل
                </th>
                <th scope="col" className="px-6 py-4">
                    نقش
                </th>
                <th scope="col" class="px-6 py-3">
                
                </th>
            </tr>
        </thead>
        <tbody>
            {users?.map(user => (
            <tr key={user._id} className="border-b-1 border-gary text-darkblue hover:bg-gary">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {user.username}
                </th>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                    {user.isAdmin === true ? 'ادمین' : 'کاربر'}
                </td>
                <td className="px-6 py-4 flex justify-center gap-4">
                    <EditIcon className="text-darkblue text-lg"/>
                    <DeleteIcon className="text-red text-lg"/>
                </td>
                </tr>
            ))}
        </tbody>
    </table>
   </div>
    </>
  )
}

export default Users
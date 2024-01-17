import React, { useState } from "react";
import {  Select , SelectItem } from "@nextui-org/react";
import {MailIcon} from '../components/icons/MailIcon.js';
import {LockIcon} from '../components/icons/LockIcon.js';
import { Link , useNavigate } from "react-router-dom";
import { EyeIcon } from "../components/icons/EyeIcon.js";
import BASE_URL from "../utils/BASE_URL.js";
import { ToastContainer,toast } from 'react-toastify'
import ReCAPTCHA from "react-google-recaptcha";


export default function Register() {
   const [username,setUsername] = useState('')
   const [password,setPassword] = useState('')
   const [email,setEmail] = useState('')
   const [Admin,setAdmin] = useState(false)
   const [verfied, setVerfied] = useState(false);
 const navigate = useNavigate()
 function onChangeRecaptcha(value) {
   if(value){
      setVerfied(true)
   }
 }
   const registerHandler = (e) => {
      e.preventDefault();
      if (Admin === 'true' || Admin === 'false')  {
           let isAdmin = JSON.parse(Admin)
           const data = {username,password,email,isAdmin}

           fetch(`${BASE_URL}/auth/register`,{
            method:'POST',
            headers:{
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
           }).then(res => res.json())
           .then(() => {toast.success('ثبت نام با موفقیت انجام شد');navigate("/")})
           .catch(err => toast.error('ثبت نام با خطا مواجه شد!'))
      }
   }
  return (
    <>
    <div className="flex justify-center items-center">
    <ToastContainer/>
      <div className="flex flex-col gap-8 p-10 shadow-md border-2 border-softblue mt-5 rounded-md w-96">
             <h3 className="text-blue text-center font-bold text-xl">ثبت نام</h3> 
             <div className="flex justify-center items-center gap-2">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-xl text-blue"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
                <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                  placeholder="نام کاربری"
                />
             </div>
             <div className="flex justify-center items-center gap-2">
               <MailIcon className="text-2xl text-blue"/>
                <input 
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="false"
                  placeholder="ایمیل"
                  type="email"
                />
             </div>
             <div className="flex justify-center items-center gap-2">
               <LockIcon className="text-2xl text-blue"/>
                <input
                  onChange={e => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  type="password"
                />
             </div>
                <div className="flex justify-center items-center gap-2">
                  <EyeIcon className="text-2xl text-blue"/>
                  <Select label="سطح دسترسی" className="w-60 rounded" onChange={e => setAdmin(e.target.value)}>
                        <SelectItem key={false} value={'false'}>کاربر</SelectItem>
                        <SelectItem key={true} value={'true'}>ادمین</SelectItem>
                  </Select>
                </div>
                <div className="py-1">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChangeRecaptcha}
            />
          </div>
                <div className="flex py-2 px-1 justify-center">
                 ثبت نام نکردی؟
                 <Link to="/" className="text-blue text-lg font-bold">اکانت بساز</Link> 
                </div>
             
                <button onClick={registerHandler}
                disabled={!verfied}
                className="bg-blue py-3 px-4  text-white text-lg font-bold rounded disabled:text-gary disabled:bg-softblue">
                  ثبت نام
                </button>
        </div>
      </div>
 
    </>
  );
}

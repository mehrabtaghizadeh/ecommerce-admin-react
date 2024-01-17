import React, { useContext, useState } from "react";
import { MailIcon } from "../components/icons/MailIcon.js";
import { LockIcon } from "../components/icons/LockIcon.js";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/BASE_URL.js";
import { UserContext } from "../context/AuthContext.js";
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verfied, setVerfied] = useState(false);
 const navigate = useNavigate()
   const {setUser,setUserRole} = useContext(UserContext)
  function onChangeRecaptcha(value) {
    if(value){
       setVerfied(true)
    }
  }
  const loginHandler = () => {
      let data = {
        email,
        password
      }
    fetch(`${BASE_URL}/auth/login`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data),
      credentials:'include'
    }).then(res => res.json()).then((data) => {
      setUser(data.user.username);
      setUserRole(data.user.isAdmin);
      toast.success('ورود با موفقیت انجام شذ');
      navigate("/dashboard")}
      )
  }
  return (
    <>
      <div className="flex justify-center bg-primarywhite items-center h-screen">
        <ToastContainer/>
        <div className="flex flex-col gap-8 p-10 border-2 border-softblue max-sm:border-none max-sm:shadow-none max-sm:p-2 shadow-md mt-8 rounded-md ">
          <h3 className="text-kblue text-center font-bold text-xl">ورود</h3>
          <div className="flex justify-center items-center rounded gap-2 w-fit bg-skyblue px-2">
            <MailIcon className="text-2xl text-blue" />
            <input placeholder="ایمیل" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="flex justify-center items-center rounded bg-skyblue w-fit px-2 gap-2">
            <LockIcon className="text-2xl text-blue" />
            <input placeholder="رمز عبور" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="flex py-1 px-1 justify-center">
            <p className="text-mainblack">ثبت نام نکردی؟</p>
            <Link to={"/register"} className="text-blue text-lg font-bold">
              اکانت بساز
            </Link>
          </div>
          <div className="py-1">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChangeRecaptcha}
            />
          </div>
          <button
            className="bg-blue py-3 px-4 mb-2 text-white text-lg font-bold rounded disabled:text-gary disabled:bg-softblue"
            disabled={!verfied}
            onClick={() => loginHandler()}
            type="submit"
          >
            ورود
          </button>
        </div>

      </div>
    </>
  );
}

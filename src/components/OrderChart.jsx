import {useState} from "react";
import BASE_URL from "../utils/BASE_URL";
import { useQuery } from "react-query"
import Lodding from "./Lodding";
export default function OrderChart() {

  const [orders,setOrders] = useState()
  const {error,isLoading} = useQuery(["orders"],()=>{
     fetch(`${BASE_URL}/orders/all`).then(res => res.json()).then(data => {setOrders(data)})
  })


   
  if (isLoading) return <Lodding/>;
  if (error) return "An error has occurred: " + error.message;
  const totalAmount = orders?.reduce((total, order) => total + order.amount, 0);
  const formattedTotalAmount = totalAmount?.toLocaleString();
  const today = new Date().toISOString().slice(0, 10); // تاریخ امروز به فرمت YYYY-MM-DD

  const todayOrders = orders?.filter(order => {
    const orderDate = new Date(order.createdAt).toISOString().slice(0, 10); // تاریخ سفارش به فرمت YYYY-MM-DD
    return orderDate === today;
  });
  
  const todayIncome = todayOrders?.reduce((total, order) => total + order.amount, 0);
  const formattedTodayIncome = todayIncome?.toLocaleString();
  
    // console.log(formattedTodayIncome)



  function formatNumber(number) {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0 برای ژانویه است
  
  const currentMonthOrders = orders?.filter(order => {
    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear();
    const orderMonth = orderDate.getMonth() + 1;
  
    return orderYear === currentYear && orderMonth === currentMonth;
  });
  
  const currentMonthIncome = formatNumber(currentMonthOrders?.reduce((total, order) => total + order.amount, 0));
  
  let redCircleStyle = {
    backgroundColor: 'red',
    bottom: '0',
    width: '25px',
    height: '12px',
    borderRadius: '3px',
  };
   let  pinkStyle = {
    backgroundColor: 'pink',
    bottom: '0',
    width: '25px',
    height: '12px',
    borderRadius: '3px',
   } 
   let orangeStyle = {
    backgroundColor: 'orange',
    bottom: '0',
    width: '25px',
    height: '12px',
    borderRadius: '3px',
   }
  if (todayIncome < 5000000) {
    redCircleStyle.height = '15px';
  } else if (todayIncome >= 5000000 && todayIncome < 10000000) {
    redCircleStyle.height = '40px';
  } else {
    redCircleStyle.height = '60px';
  }

  if (totalAmount < 5000000) {
    pinkStyle.height = '15px';
  } else if (totalAmount >= 5000000 && totalAmount < 10000000) {
    pinkStyle.height = '40px';
  } else {
    pinkStyle.height = '60px';
  }

  if (currentMonthIncome < 5000000) {
    orangeStyle.height = '15px';
  } else if (currentMonthIncome >= 5000000 && currentMonthIncome < 10000000) {
    orangeStyle.height = '40px';
  } else {
    orangeStyle.height = '60px';
  }

  return (
    <>
        <div className="grid grid-cols-3 p-2 max-md:grid-cols-2 max-sm:grid-cols-1 mt-6 gap-6">
        <div className="flex flex-col h-28 gap-4 bottom-0 justify-center items-center max-md:m-6">
          <div className=" text-mainblack border-b-2 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">           
           <p className='mb-3'>
            {formattedTotalAmount}  تومان
            </p> 
            <div className="h-20 flex items-end">
            <div style={pinkStyle}></div>
            </div>
          </div>
          <p className="flex gap-2 text-mainblack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            مجموع درآمد
          </p>
        </div>
        <div>
          <div className="flex flex-col h-28 gap-4 bottom-0 justify-center items-center max-md:m-6">
          <div className=" text-mainblack border-b-2 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">            
              <p className="mb-3">{currentMonthIncome} تومان</p>
              <div className="h-20 flex items-end">
              <div style={orangeStyle}></div>
              </div>
            </div>
            <p className="flex gap-2 text-mainblack">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            درآمد ماه
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-28 bottom-0 justify-center items-center max-md:m-6">
          <div className=" text-mainblack border-b-2 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">
            <p className="mb-3">{formattedTodayIncome} تومان</p>
            <div className="h-20 flex items-end">
            <div style={redCircleStyle}></div>
            </div>
          </div>
          <p className="flex gap-2 text-mainblack">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
              در آمد امروز
          </p>
        </div>
       </div>
    </>
  );
}

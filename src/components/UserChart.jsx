import { useState } from "react";
import BASE_URL from "../utils/BASE_URL";
import { useQuery } from "react-query";
import Lodding from "./Lodding";
export default function UserChart() {
  const [users, setUsers] = useState([]);
  const { isLoading, error } = useQuery(["users"], () =>
    fetch(`${BASE_URL}/auth/alluser`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
  );

  if (isLoading) return <Lodding />;

  if (error) return "An error has occurred: " + error.message;

  // فرض کنیم users داده‌های دریافتی از سرور باشد که شامل اطلاعات کاربران است.

  // ابتدا تاریخ امروز را بدست آورید
  const today = new Date();

  // سپس تابعی برای بررسی ثبت نام در این ماه بنویسید
  const getRegistrationsForThisMonth = (users) => {
    const thisMonth = today.getMonth(); // ماه فعلی
    const registrationsThisMonth = users.filter((user) => {
      const registrationDate = new Date(user.registrationDate); // فرضاً registrationDate تاریخ ثبت‌نام کاربر است
      return registrationDate.getMonth() === thisMonth;
    });
    return registrationsThisMonth.length;
  };

  // حالا تابعی برای بررسی ثبت نام‌های امروز بنویسید
  const getRegistrationsForToday = (users) => {
    const registrationsToday = users.filter((user) => {
      const registrationDate = new Date(user.registrationDate); // فرضاً registrationDate تاریخ ثبت‌نام کاربر است
      const userDay = registrationDate.getDate();
      const userMonth = registrationDate.getMonth();
      const userYear = registrationDate.getFullYear();
      return (
        userDay === today.getDate() &&
        userMonth === today.getMonth() &&
        userYear === today.getFullYear()
      );
    });
    return registrationsToday.length;
  };

  // استفاده از توابع برای محاسبه تعداد ثبت نام‌های این ماه و امروز
  const registrationsThisMonth = getRegistrationsForThisMonth(users);
  const registrationsToday = getRegistrationsForToday(users);
  const totalUsers = users.length;

  let yellowStyle = {
    backgroundColor: "yellow",
    bottom: "0",
    width: "25px",
    height: "12px",
    borderRadius: "3px",
  };
  let greenStyle = {
    backgroundColor: "green",
    bottom: "0",
    width: "25px",
    height: "12px",
    borderRadius: "3px",
  };
  let blueStyle = {
    backgroundColor: "blue",
    bottom: "0",
    width: "25px",
    height: "12px",
    borderRadius: "3px",
  };
  if (registrationsThisMonth < 50) {
    yellowStyle.height = "15px";
  } else if (registrationsThisMonth >= 50 && registrationsThisMonth < 100) {
    yellowStyle.height = "30px";
  } else {
    yellowStyle.height = "60px";
  }

  if (totalUsers < 500) {
    greenStyle.height = "15px";
  } else if (totalUsers >= 500 && totalUsers < 1000) {
    greenStyle.height = "30px";
  } else {
    greenStyle.height = "60px";
  }

  if (registrationsToday < 5) {
    blueStyle.height = "15px";
  } else if (registrationsToday >= 5 && registrationsToday < 10) {
    blueStyle.height = "30px";
  } else {
    blueStyle.height = "60px";
  }

  return (
    <>
      <div className="grid grid-cols-3 p-2 max-md:grid-cols-2 max-sm:grid-cols-1 mt-6 gap-6">
        <div className="flex flex-col h-28 gap-4 bottom-0 justify-center items-center">
          <div className="text-mainblack border-b-1 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">
            <p className="mb-3">{totalUsers}</p>
            <div className="h-20 flex items-end">
              <div style={greenStyle}></div>
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
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>
            کل کاربران
          </p>
        </div>
        <div>
          <div className="flex flex-col h-28 gap-4 bottom-0 justify-center items-center">
            <div className="text-mainblack border-b-1 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">
              <p className="mb-3">{registrationsThisMonth}</p>
              <div className="h-20 flex items-end">
                <div style={yellowStyle}></div>
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
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
              ثبت نام این ماه
            </p>
          </div>
        </div>
        <div className="flex flex-col h-28 gap-4 bottom-0 justify-center items-center">
          <div className=" text-mainblack border-b-1 border-gary flex flex-col justify-center items-center w-40 max-sm:w-32">
            <p className="mb-3">{registrationsToday}</p>
            <div className="h-20 flex items-end">
              <div style={blueStyle}></div>
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
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            ثبت نام امروز
          </p>
        </div>
      </div>
    </>
  );
}

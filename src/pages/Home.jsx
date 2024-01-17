import OrderChart from "../components/OrderChart";
import UserChart from "../components/UserChart";
import ProductTable from "../components/ProductTable.jsx";

function Home() {

  return (
    <div className="p-8 max-sm:p-0 max-sm:flex max-sm:flex-col justify-center">
      <h3 className="p-2 mr-2 font-bold mt-4 mb-2 flex gap-1 justify-start items-center text-xl">
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-orange text-white">
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        </div>
        سفارشات
      </h3>
      <OrderChart />
      <h3 className="p-2 mr-2 font-bold mt-8 flex gap-1 justify-start items-center text-xl">
      <div className="flex justify-center items-center w-10 h-10 rounded-full bg-orange text-white">
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        </div>         
        کاربران
      </h3>
      <UserChart />
      <h3 className="p-2 mr-2 font-bold mt-12 flex gap-1 justify-start items-center text-xl">
      <div className="flex justify-center items-center w-10 h-10 rounded-full bg-orange text-white">
        <svg xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"strokeWidth={1.5}stroke="currentColor"className="w-6 h-6"><path strokeLinecap="round"strokeLinejoin="round"d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/></svg>
       </div>
        محصولات
      </h3>
       <ProductTable/>
    </div>
  );
}

export default Home;

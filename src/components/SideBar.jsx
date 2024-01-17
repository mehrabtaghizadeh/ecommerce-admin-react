import React from "react";
import { NavLink , useLocation } from "react-router-dom";
function SideBar() {

  const activeLink = 'bg-orange text-primarywhite flex justify-center items-center gap-2 py-2 px-8 rounded transition-colors';
  const normalLink =  'flex justify-center items-center gap-2 py-2 px-8 rounded' 
   const location = useLocation()
   const sideBarShouldBeHidden = ["/","/register"].includes(location.pathname)
  return (
    <div
      className={sideBarShouldBeHidden? "hidden" : "flex h-screen fixed py-2 max-lg:hidden bg-primaryblue text-softblue" }
    >
      <ul className="p-2 flex flex-col gap-10">
        <li className=" flex justify-center items-center mb-3 mr-3 py-2 text-skyblue text-xl">
          <h2>adminPanel</h2>
          <span>&#128640;</span>
          </li>
        <li className="rounded p-2 flex justify-center gap-2">
          <NavLink className={({isActive})=>(isActive ? activeLink : normalLink)} to={"/dashboard"} >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>
            
            داشبورد
            </NavLink>
        </li>
        <li className="flex justify-center gap-2  mr-2">
          <NavLink className={({isActive})=>(isActive ? activeLink : normalLink)} to={"/products"}>
            <div>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
              <path
                fillRule="evenodd"
                d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
            محصولات
            </NavLink>
        </li>
        <li className="flex justify-center gap-2 ml-3">
          <NavLink className={({isActive})=>(isActive ? activeLink : normalLink)} to={"/users"}>     
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
            کاربران
            </NavLink>
        </li>
        <li className="flex justify-center gap-2 mr-1">
          <NavLink className={({isActive})=>(isActive ? activeLink : normalLink)} to={"/orders"}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
            
            سفارشات
            </NavLink>
        </li>
        <li className="flex justify-center gap-2 ">
          <NavLink className={({isActive})=>(isActive ? activeLink : normalLink)} to={"/addCategory"}>            
          <div>
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
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
            دسته بندی ها
            </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
 
// export default function Sidebar() {
//   return (
//     <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//       <div className="mb-2 p-4">
//         <Typography variant="h5" color="blue-gray">
//           Sidebar
//         </Typography>
//       </div>
//       <List>
//         <ListItem>
//           <ListItemPrefix>
//             <PresentationChartBarIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Dashboard
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <ShoppingBagIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           E-Commerce
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <InboxIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Inbox
//           <ListItemSuffix>
//             <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
//           </ListItemSuffix>
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <UserCircleIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Profile
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <Cog6ToothIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Settings
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <PowerIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Log Out
//         </ListItem>
//       </List>
//     </Card>
//   );
// }
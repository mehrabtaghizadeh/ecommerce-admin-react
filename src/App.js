import {useNavigate,Route,Routes,useLocation} from "react-router-dom";
import SideBar from "./components/SideBar";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./pages/Login"
import Produts from "./pages/Produts";
import EditProduct from "./pages/EditProduct";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./pages/Register";
import { UserContextProvider } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Erorr from "./pages/Erorr";


const queryClient = new QueryClient({});
function App() {
  const location = useLocation()
  const sideBarShouldBeHidden = ["/","/register"].includes(location.pathname)
  return (
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>

    <div className="App">
       <Nav/>
       <div className="flex max-md:justify-center">
       <SideBar/>
       <div className={sideBarShouldBeHidden ? "grow" : "grow mr-56 max-lg:mr-0"}>
       <Routes>
       <Route path="/dashboard" element={<Auth><Home/></Auth>}/>
       <Route path="/" element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/products" element={<Auth><Produts/></Auth>}/>
       <Route path="/products/add" element={<Auth><AddProduct/></Auth>}/>
       <Route path="/products/edit/:id" element={<Auth><EditProduct/></Auth>}/>
       <Route path="/addCategory" element={<Auth><AddCategory/></Auth>}/>
       <Route path="/editCategory/:id" element={<Auth><EditCategory/></Auth>}/>
       <Route path="/users" element={<Auth><Users/></Auth>} />
       <Route path="/orders" element={<Auth><Orders/></Auth>}/>
       <Route path="*" element={<Erorr/>} />
       </Routes>
       </div>
       </div>
    </div>
    </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
